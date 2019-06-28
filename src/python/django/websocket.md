# 给django添加websocket

## 选型
django的websocket库很多，但是很多都是好多年前的版本，明显作者都没更新了。所以我们选择了`Channels`这个发展比较良性的库来集成。
[官方文档在此](https://channels.readthedocs.io/en/latest/)

## 安装
```sh
pip install -U channels
```

在你项目的settings.py中添加channels：
```python {2}
INSTALLED_APPS = (
    'channels', # 添加这一行，建议将它添加到第一行
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',   
)

```
然后，创建一个默认路由文件：myproject/routing.py:

```python
from channels.routing import ProtocolTypeRouter

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
})
```
添加完成后，在你项目settings.py中添加`ASGI_APPLICATION`设置项：
```python
ASGI_APPLICATION = "mysite.routing.application" # 其中mysite是你项目的名称
```


## 教程：简易的聊天室

### 创建聊天应用
在项目manage.py所在的目录执行：
```sh
python3 manage.py startapp chat
```
那将创建一个目录`chat`，其布局如下：
```
chat/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

我们需要告诉我们的项目chat安装了应用程序。编辑 `mysite/settings.py`文件并添加'chat'到INSTALLED_APPS设置。它看起来像这样：
```python {3}
# mysite/settings.py
INSTALLED_APPS = [
    'chat',
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

### 添加index.html
我们现在将创建第一个视图，一个索引视图，允许您键入要加入的聊天室的名称。

`chat`目录中创建一个`templates`目录。
在你刚刚创建的`templates` 目录中，创建另一个名为的目录`chat`，并在其中创建一个名为`index.html`视图模板的文件。
您的`chat`目录现在应该如下所示：
``` {3,4,5}
chat/
    __init__.py
    templates/
        chat/
            index.html
    views.py
```
将以下代码放入`chat/templates/chat/index.html`:

```html
<!-- chat/templates/chat/index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Chat Rooms</title>
</head>
<body>
    What chat room would you like to enter?<br/>
    <input id="room-name-input" type="text" size="100"/><br/>
    <input id="room-name-submit" type="button" value="Enter"/>

    <script>
        document.querySelector('#room-name-input').focus();
        document.querySelector('#room-name-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#room-name-submit').click();
            }
        };

        document.querySelector('#room-name-submit').onclick = function(e) {
            var roomName = document.querySelector('#room-name-input').value;
            window.location.pathname = '/chat/' + roomName + '/';
        };
    </script>
</body>
</html>
```


### 添加room.html
创建一个新文件`chat/templates/chat/room.html`。并将如下代码写入：
```html
<!-- chat/templates/chat/room.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Chat Room</title>
</head>
<body>
    <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
    <input id="chat-message-input" type="text" size="100"/><br/>
    <input id="chat-message-submit" type="button" value="Send"/>
</body>
<script>
    var roomName = {{ room_name_json }};

    var chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/' + roomName + '/');

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        document.querySelector('#chat-log').value += (message + '\n');
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };

    document.querySelector('#chat-message-submit').onclick = function(e) {
        var messageInputDom = document.querySelector('#chat-message-input');
        var message = messageInputDom.value;
        chatSocket.send(JSON.stringify({
            'message': message
        }));

        messageInputDom.value = '';
    };
</script>
</html>
```



### 引入视图

将以下代码放入chat/views.py：
```python
# chat/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': room_name
    })
```

要调用视图，我们需要将其映射到URL - 为此我们需要一个URLconf。
要在聊天目录中创建URLconf，请创建一个名为的文件`urls.py`到`chat` app文件里，并将以下代码写入：
```python
# chat/urls.py
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]
```

然后在`mysite/urls.py`文件里引入这个`chat/urls.py`的内容:

```python {6}
# mysite/urls.py
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^chat/', include('chat.urls')),
    url(r'^admin/', admin.site.urls),
]
```

### 写一个消费者
当Django接受HTTP请求时，它会查询根URLconf以查找视图函数，然后调用视图函数来处理请求。类似地，当`Channels`接受WebSocket连接时，它会查询根路由配置以查找使用者，然后调用使用者的各种函数来处理来自连接的事件。

我们将编写一个基本的使用者，它接受路径上的WebSocket连接，该路径 /ws/chat/ROOM_NAME/接收它在WebSocket上接收的任何消息并将其回送到同一个WebSocket。

::: tip
优良作法是使用公共路径前缀/ws/来区分WebSocket连接和普通HTTP连接，因为它会使Channels在某些配置中更容易部署到生产环境中。

特别是对于大型站点，可以配置像nginx这样的生产级HTTP服务器，将基于路径的请求路由到生产级WSGI服务器

（1）`Gunicorn` + `Django`用于普通HTTP请求

和一个生产级的ASGI服务器：

（2）`Daphne` + `Channels`用于WebSocket请求

请注意，对于较小的站点，您可以使用更简单的部署策略，其中Daphne为所有请求（HTTP和WebSocket）提供服务，而不是使用单独的WSGI服务器。在此部署配置中，不需要像＃那样的公共路径前缀/ws/。
:::

将以下代码写入`chat/consumers.py`：
```python
# chat/consumers.py
from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))
```

将以下代码写入`chat/routing.py`：
```python {7}
# chat/routing.py
from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/chat/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
]
```

回到我们前面创立的`mysite/routing.py`文件，将代码改为如下：
```python
# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
```

## 进阶：启用通道层
::: tip
通道层是一种通信系统。它允许多个消费者实例彼此通讯，以及与Django的其他部分通讯。
:::

通道层提供以下抽象：
1. 一个`channel`（频道）是消息可以被发送到一个邮箱。每个频道都有一个名字。拥有频道名称的任何人都可以向频道发送消息。
2. 一个`group`是一组相关的频道。每个组有一个名字。具有组名称的任何人都可以按名称向组添加/删除频道，并向组中的所有频道发送消息。无法枚举特定组中的通道。

每个消费者实例都有一个自动生成的唯一频道名称，因此可以通过通道层进行通信。

在我们的聊天应用程序中，我们希望ChatConsumer在同一个房间中有多个实例相互通信。为此，我们将每个ChatConsumer将其频道添加到名称基于房间名称的组。这将允许ChatConsumers将消息传输到同一房间中的所有其他ChatConsumers。

### 安装redis服务器
我们将使用一个使用Redis作为其后备存储的通道层。要在端口6379上启动Redis服务器，请运行以下命令：
```sh
docker run -p 6379:6379 -d redis:2.8
```
或者自行安装redis服务器

### 安装channels_redis
我们需要安装channels_redis，以便Channels知道如何与Redis连接。运行以下命令：
```python
pip3 install channels_redis
```

在我们使用通道层之前，我们必须对其进行配置。编辑 mysite/settings.py文件并CHANNEL_LAYERS在底部添加设置。它应该看起来像：
```python
# mysite/settings.py
# Channels
ASGI_APPLICATION = 'mysite.routing.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
```
::: tip
可以配置多个通道层，如果你的项目需要，但大部分项目都只需要一个`default`的通道层。
:::

### 测试通道层

让我们确保通道层可以与Redis通信。打开Django shell并运行以下命令：
```sh
$ python3 manage.py shell
>>> import channels.layers
>>> channel_layer = channels.layers.get_channel_layer()
>>> from asgiref.sync import async_to_sync
>>> async_to_sync(channel_layer.send)('test_channel', {'type': 'hello'})
>>> async_to_sync(channel_layer.receive)('test_channel')
{'type': 'hello'}
```

### 修改消费者代码

现在我们有了一个通道层，让我们使用它ChatConsumer。将以下代码放入chat/consumers.py，替换旧代码：
```python
# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
```

### 测试
自此，我们完成了一个简单的聊天室功能
```sh
python3 manage.py runserver
```

打开浏览器选项卡到http://127.0.0.1:8000/chat/lobby/的会议室页面。打开第二个浏览器选项卡到同一个房间页面。

在第二个浏览器选项卡中，键入消息“hello”并按Enter键。您现在应该在第二个浏览器选项卡和第一个浏览器选项卡中的聊天记录中看到“hello”。

您现在拥有一个基本的全功能聊天服务器！

## 将消费者改写成异步
将以下代码放入`chat/consumers.py`
```python
# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
```

## 部署
### 设置协议服务
wsgi是不支持websocket的，所以我们需要启用一个asgi服务器
在你项目的`mysite/wsgi.py`相同的目录下，创建一个`asgi.py`的文件，并将代码写入：
```python
"""
ASGI entrypoint. Configures Django and then runs the application
defined in the ASGI_APPLICATION setting.
"""

import os
import django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings") # 其中mysite改为你的项目名称
django.setup()
application = get_default_application()
```

### 启用daphne服务器
```sh
daphne -b 0.0.0.0 -p 8001 --proxy-headers mysite.asgi:application
```

### 配置nginx
```

upstream wsbackend {
    server 127.0.0.1:8001;
}

server {
    listen 80;

    # 在80端口的server区域内添加ws指向，如果要支持wss，记得在443端口区域添加类似的代码
    location /ws {
        proxy_pass http://wsbackend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $server_name;
    }

}
```

### 配置Supervisor进程保护
#### 安装
```sh
# apt 安装
$ sudo apt install supervisor
# yum 安装：
yum install python-setuptools
easy_install supervisor
# 或者
yum install -y epel-release
yum install -y supervisor  

# 手动安装：
wget https://pypi.python.org/packages/source/s/supervisor/supervisor-3.1.3.tar.gz
tar zxf supervisor-3.1.3.tar.gz
cd supervisor
python setup.py install

# pip安装：
pip install supervisor

```

#### 生成配置文件
```
echo_supervisord_conf > /etc/supervisord.conf
```

#### 加入配置文件
```
[program:daphne]
directory=/opt/app/mysite  #项目目录
command=daphne -b 127.0.0.1 -p 8001 --proxy-headers mysite.asgi:application #启动命令
autostart=true
autorestart=true
stdout_logfile=/tmp/websocket.log  #日志
redirect_stderr=true
```

#### 启动supervisor
```
supervisord -c /etc/supervisord.conf
```

#### 启动或者停止daphne
```
supervisorctl start daphne
```



