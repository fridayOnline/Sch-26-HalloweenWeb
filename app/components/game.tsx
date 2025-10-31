"use client";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/finalbuild/build.loader.js",
  dataUrl: "/finalbuild/webgl.data",
  frameworkUrl: "/finalbuild/build.framework.js",
  codeUrl: "/finalbuild/build.wasm",

});

function Game() {
  return (
    <div  className="border-2 border-[#5FFAA1] w-full aspect-video"
    style={{
          boxShadow: '0 0 50px #5FFAA1'
         }}
    >

      <Unity unityContext={unityContext} className="w-full aspect-video bg-grey"/>
    </div>
  );
}
export default Game;

