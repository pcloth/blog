# 给flask添加WebSocket
## 方案选取
flask目前有两个较为广为流传的方案：`Flask-SocketIO` 和 `Flask-Sockets`，其中Flask-SocketIO封装得比较多，但是它自己用http轮询封装了一个新的协议来实现websocket功能，前端需要加载一个js库来实现，如果要实现原生浏览器websocket会有较多的坑要填。
另外，一般情况下我们需要用websocket就是不想用轮询，结果你又给我用轮询封装，感觉有点多此一举。

::: tip 所以
我选择了[`Flask-Sockets`](https://github.com/heroku-python/flask-sockets)
:::

## 集成到 app
``` python
from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

@sockets.route('/echo')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        ws.send(message)

@app.route('/')
def hello():
    return 'Hello World!'

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()
```

## 集成到蓝图 buleprint
``` python {21}
from flask import Flask, Blueprint
from flask_sockets import Sockets

html = Blueprint(r'html', __name__)
ws = Blueprint(r'ws', __name__)

@html.route('/')
def hello():
    return 'Hello World!'

@ws.route('/echo')
def echo_socket(socket):
    while not socket.closed:
        message = socket.receive()
        socket.send(message)

app = Flask(__name__)
sockets = Sockets(app)

app.register_blueprint(html, url_prefix=r'/')
sockets.register_blueprint(ws, url_prefix=r'/') # 注册蓝图到sockets

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()
```

## 改良
``` python
@sse.route('/echo')
def echo_socket(socket):
    # print('socket.closed:',not socket.closed)
    # env = request.environ.get('wsgi.websocket')
    # print(dir(socket), '---->')
    # print(dir(socket.handler),'<<><><><><')
    # print(socket.handler.active_client)
    # a = socket.handler.active_client
```

## 部署
`Flask-Sockets`集成了gunicorn的部署支持，很方便
``` sh
gunicorn -k flask_sockets.worker manage:app -c gunicorn.conf
```
使用 -k 参数指定 flask_sockets.worker 作为worker或者直接在gunicorn.conf里配置上
``` python
worker_class="flask_sockets.worker"
```

