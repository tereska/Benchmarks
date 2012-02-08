import tornado.ioloop
import tornado.web
import tornado.httpserver

data = "0" * 30000

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.finish(data)

application = tornado.web.Application([
    (r"/", MainHandler),
])


if __name__ == "__main__":
    server = tornado.httpserver.HTTPServer(application)
    server.listen(8080)
    tornado.ioloop.IOLoop.instance().start()

