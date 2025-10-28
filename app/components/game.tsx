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
    <div>

      <Unity unityContext={unityContext} className="w-full bg-grey"/>
    </div>
  );
}
export default Game;

