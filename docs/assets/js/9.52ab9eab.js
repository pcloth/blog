(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{170:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("所以")]),t._v(" "),a("p",[t._v("我选择了"),a("a",{attrs:{href:"https://github.com/heroku-python/flask-sockets",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Flask-Sockets")]),a("OutboundLink")],1)])]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._m(5),t._v(" "),t._m(6),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),a("p",[t._v("使用 -k 参数指定 flask_sockets.worker 作为worker或者直接在gunicorn.conf里配置上")]),t._v(" "),t._m(12)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"给flask添加websocket"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#给flask添加websocket","aria-hidden":"true"}},[this._v("#")]),this._v(" 给flask添加WebSocket")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"方案选取"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方案选取","aria-hidden":"true"}},[this._v("#")]),this._v(" 方案选取")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("flask目前有两个较为广为流传的方案："),s("code",[this._v("Flask-SocketIO")]),this._v(" 和 "),s("code",[this._v("Flask-Sockets")]),this._v("，其中Flask-SocketIO封装得比较多，但是它自己用http轮询封装了一个新的协议来实现websocket功能，前端需要加载一个js库来实现，如果要实现原生浏览器websocket会有较多的坑要填。\n另外，一般情况下我们需要用websocket就是不想用轮询，结果你又给我用轮询封装，感觉有点多此一举。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"集成到-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#集成到-app","aria-hidden":"true"}},[this._v("#")]),this._v(" 集成到 app")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" flask "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Flask\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" flask_sockets "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Sockets\n\napp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Flask"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__name__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsockets "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Sockets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n@sockets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/echo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("echo_socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("closed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        message "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("receive"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("send"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n@app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hello")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello World!'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" __name__ "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__main__"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" gevent "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" pywsgi\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" geventwebsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handler "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" WebSocketHandler\n    server "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pywsgi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("WSGIServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handler_class"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("WebSocketHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("serve_forever"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"集成到蓝图-buleprint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#集成到蓝图-buleprint","aria-hidden":"true"}},[this._v("#")]),this._v(" 集成到蓝图 buleprint")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" flask "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Flask"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Blueprint\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" flask_sockets "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Sockets\n\nhtml "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Blueprint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'html'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" __name__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nws "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Blueprint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'ws'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" __name__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n@html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("route"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hello")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello World!'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("route")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/echo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("echo_socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("closed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        message "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("receive"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("send"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\napp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Flask"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__name__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsockets "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Sockets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("register_blueprint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url_prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nsockets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("register_blueprint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ws"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url_prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("r'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 注册蓝图到sockets")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" __name__ "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"__main__"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" gevent "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" pywsgi\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" geventwebsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handler "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" WebSocketHandler\n    server "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pywsgi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("WSGIServer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handler_class"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("WebSocketHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("serve_forever"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"改良"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#改良","aria-hidden":"true"}},[this._v("#")]),this._v(" 改良")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@sse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("route")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/echo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("echo_socket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# print('socket.closed:',not socket.closed)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# env = request.environ.get('wsgi.websocket')")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# print(dir(socket), '----\x3e')")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# print(dir(socket.handler),'<<><><><><')")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# print(socket.handler.active_client)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# a = socket.handler.active_client")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#部署","aria-hidden":"true"}},[this._v("#")]),this._v(" 部署")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Flask-Sockets")]),this._v("集成了gunicorn的部署支持，很方便")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("gunicorn -k flask_sockets.worker manage:app -c gunicorn.conf\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[this._v("worker_class"),s("span",{pre:!0,attrs:{class:"token operator"}},[this._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[this._v('"flask_sockets.worker"')]),this._v("\n")])])])}],!1,null,null,null);s.default=e.exports}}]);