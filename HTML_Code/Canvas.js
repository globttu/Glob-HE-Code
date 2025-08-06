let canvas_element="" +
    "<canvas id='GlobRenderCanvas' width='1000' height='1000'> </canvas>" +
    "<script>" +
    "let canvas = document.getElementById('GlobRenderCanvas');" +
    "let _3d=canvas.getContext('webgl') " +
    "_3d.clearColor(0.0, 0.0, 0.0, 1.0);" +
    "_3d.clear(gl.COLOR_BUFFER_BIT)" +

    "</script>" +
    "" +
    "" +
    ""
export {canvas_element};
