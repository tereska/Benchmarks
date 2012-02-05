-module(test).
-export([start/1, stop/0]).

start(Port) ->
	{ok, Bin} = file:read_file("onet.txt"),	
	misultin:start_link([{port, Port}, {compress, false}, {loop, fun(Req) -> Req:ok(Bin) end}]).

stop() ->
	misultin:stop().
