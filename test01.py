import tornado.ioloop
import tornado.web
import tornado.httpserver

data = "0" * 30000
data2 = "HTTP/1.1 200 OK\r\nContent-Length: 30000\r\n\r\n" + data

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.finish(data)

application = tornado.web.Application([
    (r"/", MainHandler),
])


def handle_request(request):
    #request.write("HTTP/1.1 200 OK\r\nContent-Length: 30000\r\n\r\n%s" % (data))
    request.write(data2)
    request.finish()


if __name__ == "__main__":
    server = tornado.httpserver.HTTPServer(handle_request)
    server.listen(8080)
    tornado.ioloop.IOLoop.instance().start()

