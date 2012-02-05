-module(test).
-export([start/0]).

start() ->
    {ok, Bin} = file:read_file("page.txt"), 
    misultin:start_link([{port, 3000}, {loop, fun(Req) -> Req:ok(Bin) end}]).
