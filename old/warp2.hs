{-# LANGUAGE OverloadedStrings #-}
import Network.Wai
import Network.Wai.Handler.Warp
import Blaze.ByteString.Builder (fromByteString)
import Network.HTTP.Types (status200)
import System.IO (withBinaryFile, IOMode (..))
import Data.ByteString (hGetContents)

main = do
    contents <- withBinaryFile "page.txt" ReadMode hGetContents
    run 3000 $ const $ return $ ResponseBuilder
        status200
        [("Content-Type", "text/plain"), ("Content-Length", "35200")]
        $ fromByteString contents
