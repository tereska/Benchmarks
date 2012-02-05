-module(test01).
-export([start/0]).

start() ->
  X = string:copies("0", 30000),
  Bin = list_to_binary(X), 
  misultin:start_link([{port, 8080}, {loop, fun(Req) -> Req:ok(Bin) end}]).

