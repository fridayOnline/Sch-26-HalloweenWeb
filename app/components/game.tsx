"use client";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/build/Downloads.loader.js",
  dataUrl: "/build/webgl.data",
  frameworkUrl: "/build/build.framework.js",
  codeUrl: "/build/build.wasm",

});

function Game() {
  return (
    <div  className="border-2 border-[#5FFAA1] mt-32"
    style={{
          boxShadow: '0 0 50px #5FFAA1'
         }}
    >

      <Unity unityContext={unityContext} className="w-full bg-grey"/>
    </div>
  );
}
export default Game;

