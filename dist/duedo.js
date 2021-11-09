/*
  ███████ ██║   ██╗███████╗██████╗  ██████╗ 
  ██╔══██╗██║   ██║██╔════╝██╔══██╗██╔═══██╗
  ██║  ██║██║   ██║█████╗  ██║  ██║██║   ██║
  ██║  ██║██║   ██║██╔══╝  ██║  ██║██║   ██║
  ██████╔╝╚██████╔╝███████╗██████╔╝╚██████╔╝
  ╚═════╝  ╚═════╝ ╚══════╝╚═════╝  ╚═════╝          
  2D-HTML5 GAME FRAMEWORK                                                    
   
   * Duedo.js
   * Author: http://www.edoardocasella.it | cs.edoardo@gmail.com | Italy
   * Project started: 2014/01/01 
   * Info: http://projects.edoardocasella.it/duedo
   * Compatibility: tested on IE >= 9, Chrome, Firefox
   
   * Copyright (c) 2014, Sebastiano Edoardo Casella
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *                          
*/
  
/*Duedo namespace*/
var Duedo = Duedo || {};


/*Duedo Info*/
Duedo.Info = {
    Version: "0.8.5",
    LastUpdate: "2015/08/02"
};


/*Main configuration*/
Duedo.Conf = {
    // Objects pinned to the viewport will not be affected by the viewport scale / zoom and will keep the same size.
    ScaleFixedToViewportOnZoom: false, // note: if false, objects must be relocated manually
    // Minimum camera zoom/scale value
    MinimumZoom: 1,
    /*The function to load when the DOM is ready*/
    MainFunc: "duedoMain",
    /*The game automatically starts the game loop -> Simulate(game, deltaT)*/
    AutoLooping: true,
    /*Shows FPS in the canvas screen*/
    DrawFPS: false,
    /*Pixels in meters |don't change it! */
    PixelsInMeter: 30
};



/*Duedo logo base64*/
Duedo.Logo64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAAC+CAYAAAACyXXdAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3gkJDys4wdb4zgAAIABJREFUeNrtnXm4HUWZh98EEvbEsDXQIJKACArShiMji7KFxkFAxUQQUHAwkQYXxDEZFAdGlIQBEYXGhEEjAcFEGWRGoCWsgjg0sVUYIYFEiByZhkBI2AmE+aPqyvF6z72n+vTZkt/7POfh4aaX6urqX3311VdfgRBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGKM0xVMDBeGM0GPtXg4WfnSXyWak2sQe1/f+C2Bg9/LE/it6nWmme4qkAIISTIQgghJMhCCCFBFkIIIUEWQggJshBCCAmyEEJIkIUQQkiQhRBCgiyEEEKCLIQQEmQhhBASZCGEkCALIYSQIAshhARZCCGEBFkIISTIQgghJMhCCCFBFkIIIUEWQggJshBCCAmyEEIICbIQQkiQhRBCSJCFEEKCLIQQQoIshBASZCGEEBJkIYSQIAshhJAgCyGEBFkIIYQEWQghJMhCCCEkyEIIIUEWQgghQRZCCAmyEEIICbIQQkiQhRBCSJCFEEKCLIQQQoIshBBCgiyEEBJkIYQQEmQhhJAgCyGEkCALIYQEWQghhARZCCEkyEIIISTIQgghQRZCCCFBFkIICbIQQggJshBCSJCFEEJIkIUQQoIshBBCgiyEEBJkIYQQEmQhhJAgCyGEkCALIYSQIAshhARZCCGEBFkIISTIQgghJMhCCCFBFkIIIUEWQggJshBCCAmyEEJIkIUQQkiQhRBCgiyEEEKCLIQQaxzr9kpBvTAaAYwDdgbeDmwDbGx/GwArgBeBZ4HF9vfHPInzDpR1FrBlg4c/mSfx5A7V6Q7AhQ6n/FeexJe3q3zVoLIO8A5gvH3n44Ctbd1uWHPoy/b3FPC4/T0E/BZY5Gfp62vCx+qF0Ta2Hvrqoq/9j7bP39f+H7ft/2HgoTyJV6+pAuaF0WbATsBYYAywkW0bq4GVwHPAk7YuluRJ/KoEuXhlvwc4BDgQ2NcKr+s1lgB3A7+0grKiDUU/BNi+wWMf62AVjwaOdDj+0TaI8Na2TIcCBwCjmrzki9WgcidwE3CDn6UP95DYbAEcBuxv6+KtBS6z0guje4A7gWvzJH6oh8V3OFCxdbEvsLcV4UZZ7YXRQ8CvgDuAW/IkflKCPHilbwt8EjjeWkfNMtb+jgde9cIoAS4DfrEmWw69RDWojASOAk6yH9uwEi+/oRX3Q4HvVIPKPcAPgGv8LH2+C9v/SOAjwHG2zM1+o6OA0P6+6YXRA8CVwH/kSfx0jwjxnsAxwCRg2yYuNRzY1f6mWIG+Dbga+GmbjLXeEGQvjHYGpgHHAiNadJuRwOH2t8QLowuBWd0+jFmDhXhj4HP2t3Wbbvs++5teDSoXAJf6WfpsF7T/DYHJwJeA7Vp4q3cB04GzvDC6CvhmnsR/6lJr+Ajgy8A+LbrNcOAg+7vQuhq/myfx0k499/AuqPgtvTD6AfAgcEILxXggy/l7wEIvjI7zwmgYol1CvE41qHwO+BPwrTaKcS2b2XsvrgaVk6pBZViH2v9wL4w+g3FdXdhiMa5lfeCfbPu/yPpiu0WMJwB/AP6zhWLcn02A062h9l0vjDZdqwTZC6NhXhidAiwETix5mOrC24A5wK1eGI2TXLZcjAPgXuC7wOZdUKRNMS6su6pBZVybv4EAuAeY1cG6GAF8HnjIC6NjOizE23thdD1mvuedHSrGOnbE9ogXRqe021Ab3qGK3xK4AbgYeEuXaMX+wP1eGE2RbLZEiIdVg8qXgN8A7+nCIu4N/LYaVD7WJmPki8D/AO/tkuffHPixF0bXemE0pgOacKy1ig/vkvoYY/XpJhvdsmYKshdG+wG/w0xYdBsbAN/3wuiHdkgnyhHj9YGrgAswfvxuZRQwrxpUzmmVC8MLo9HA9dY9MaIL6+AjQArs3iY92MALozmYicZRXVgfhwB/8MIoXOME2QujTwC30BmfoQsnAB+XlJYixqPtOz+mh4r9VWCmjYMus/1va10UH+ry5x8HXNQGPdgCE453XJfXx2bADdbFumYIshdGJ1sraQRibRLjX1p3QK/xGeCysixlL4x2tGK8i1rGXzunXwN79kiRhwMXe2E0recF2QujyUCsZrjWuSmup3t8pEU4EfjXEtr/9sDtNBdDuyaJ8da2PnbsweKf20pRXrcNlX84cGmJl3wJ+D2wCBMq9BywijeXkL4dE/i9o5p+x8R4GDAbeP8a8Dj/Wg0qd/lZOr9g+x+DWSXol1imhZil4YswKQNewPjmN8GsEN0ZeDewXheK8SbAjdYtUgbLraW9EHgEs3T8JUzU1mhb7zsCAcYvXsaI51wvjJ7Ok/iynhJkL4x2An5cgiWeY1bTXAfc08hCDi+MtgImYHyXh2DCWUR7+DLl++BfBxZgojQWAkuA5+3vLZgcBttZl8CewD+UOAL8UTWo7OZn6TOO7X8Yxk3X7IrT16yoX4NZ7vt/Ddx7fVsHR9l3sUUXiPEwzOTdu5u81F9svc4FftvoilsvjN6CWYp+LCaooBlxvsQLo0V5Et/RE4LshdEGwLXWci3KA5jg/Xl5Er/mpOCm0c4B5tiwlX/G+AU3kl621DreCzi3xEvejlnq/AsXQawGlc2AjwJftCOmZtgG+CZwsuN5U4EPNnHfFzChVxflSfyEY/t/2dbd7V4YfcmK0FforA/7y5jVd0V5FDgHmFNkdW2exM9aIb/KGotnAJ8qKMwjgKu9MNqjzHwYrfQhn49Zpll0GPJZ4N15El/tKsYDvIi/5El8mh3K/USy2TIx3shaQGWMRq4H9vCz9AA/S+e4Wqd+lj7tZ+lltg0eDyxrsjyfqQaVtzsYJO+14lGUOcC4PImnuYrxAO1/VZ7Es4HdMItAVnbAOt7VdmpFR0fnALvmSXx5GakO8iR+OE/iEzFzHFnBy2xNyXNjw1tU+XsVsCb6uMVW/Myyk//kSVzNk/hoO4zreP6CNZAzad53/zCwv5+lR/pZ+vtmC+Rn6Rt+ll5preTbm7jUOsDXG2z/6wIzC3ZMTwOH50n8ybJTx+ZJ/HqexN/DrIK7u82uissoFmH1BLB/nsRn5kn8Utlly5P4Pkxuk0sKXuIoL4xKC2Mc3oLKXxf4fsFhwLeBQxrxkTX5Eq7F5NjtmVSMPWAd74xJjNMMlwC7+1l6R9nl87P0KUzGsxuauMzEalBpZInzqcAeBa7/v8B78iT+7xa3/8eBD9C+yKdPUyz08RFgrzyJ72pxfbySJ/GpmFwWRYiti7YrLeTjCjbGaXkSn96ulJh5Ei/BJC75neS0FM6meIz5KuA4P0tP9bP05VYV0M/SV4GJmCW6RRhp3R+DGSSjgbMKXPteYN92ZRqz1vIp9r210joeSbHQwUeBffIk/nO7GnCexN/GzDm4sh0mnWd3CbJNmfe1AqeekyfxjHYrSJ7ET2EiMB6RnjZlHe+KyVVbhBeBD/pZelU7yupn6YuYyJui8xJD5Vo4GRNu5cIDwAftpFO7v4GzcNs1poh17JrBboWtjyc7UB8XYbJAujK1DCu5bAt5Eu7xhT/Lk/jMTomJFeV/xIRPiWJ8nmIuqtXAUX6W3tLOwvpZ+scmhuv7VIPKhnUMko0wkQQuPAsckSfxMx18f6djYoPLto6HA/9S4NSowzubnI77RN9WmIVEXSXIrhN5f8LkZO0oeRI/XNaQYy20jkdhQqoKNXw/S29qc3n3rgaVayg+6TyS+qsPP4bJe+DCiZ1OEJ8n8RsYV2O15EsfhPu2Uz/Pk/jHHa6PVZhdi1z3Yvx01wiy3TDTdWXWKd2wbYp9CT+muQmftZXDKBZrfjttSGBjRXj9alA5sRpUFmCiCz5OczlV6sU1f8rxOj/Nk/i6Lmn/zwBfKPmyrvWxqsAIo1X18QAmMsSF8V4YNZXHuUwL2TVj0/V5Et/YZeLyhQK94tpOkfzBrwNT/Cx9o8VC/NZqUDkX+DNmcUlZeZjfMYBBsh0mp3ajvEKxCaRWitDPgJtLMtA2xCzMceGKPIm7aT7nHNtJtFIH/4YyV+od5nj8Wd2mLHkSP+KF0ZUFeva11V2xDnBwgVOv9LN0UQvLtT9m14cjac2SeW+Av4W4+dFn50lcbfI5N8DseLMlZiLsMT9Ll5cgQhNKqKO9cd8l/qIm6mIjzAT9ePt+XrAdceJn6QMF9aDqhdE84BMOp02gmN+8PEG2oT4uafTuzJM461KdOV+C3DABxZKKX1J2QexE23FWiN/V4uceKIri4ALtrOizHgJEthOo3Uhhdc2u2lf4WeocSZIn8Z1eGN1H82kxD3I8/rd5Et9foC5GWePus3U6gPOrQeUPwFf8LE0KPMcPHQU58MJoTJ7EhTrGslwW+zpaIj/sVoWxvqNu7Sy6jSKpNR/yszQtUYh3sLtHVzGr497VhuceqBM60OH8u4sMzatBZXQ1qMwFEmv9rz/A97wPcDlwbzWoFF01ObuEOjrA8fh5BepjV8w6gtOGsMZ3B26qBpULCuS3vgOTysFFU/crWmllCbKLb2418PMuF5qfSWsbosgExi9KEOFh1aBySDWoXA8sxqwQbMfejAsxft9/7DdC3Aa3bGo/LSLGGP/uRIfRyz1WtFy5tgNtY75jfbwNuA3YweG0L2G2EXMx0FYBtzo+S+Htr8oS5Lc7HJsVNefbyC2IRiiSVvLOJoR4k2pQ+RzwR2slHk7rdyt/HbMd/QRgFz9LL/KztP8Cjp0dr3lrgXL8AKg4nrM58HPrX3URoScwy7gLYXcDcYm8eRGHFbPWyp2D8Z27clo1qLjOd/26hXr4N5Q1qeeS0u+eHhCaBZiVXOsiBqNI0nXnpeo2T0aECbzfpE3PlgOzgFl+lj5eYsf0InC/4/OHuEcs9LEjJvXsWY7n3VtwBFREkB50zOh4OMZNWpTzHEdqrkvtdy5asLIs5K0cjl3U7SpjhylLpLdDG0OOx78KPN7IgdWgMrwaVA6rBpWbMLtjfL5NYnwncDSwnZ+lX29AjF3rYZFdiOHCqU0+U1Rgw9ZmVspt43i867fW7Kaou1aDyh4tLN9WRQtWlgXoMjxZSm+wtJmhx1qCq9/2CT9LVw8hxKMxK55OBca26TmeB64ALi0YIvWWVrV/G9p2cJPPtwWwl+PQe2mb9ADMDiAulBGWN8FhtOYanji6aKHKEmSXAqygN3hOejuoUBSJ7105yPXeiQlZOx7YsE2P8b+Y/R6v8LO0mfe9SRl1UIft+ftoiiLs4ijIzdSHqyCvcGh3G1LOBG7DCY/yJH7FC6M3aHy+ovBIrhM+0l5ZCfeKZHdQRhY4Z/UAon6EdUfs36Zyv4aJIohLzLu8Tgvb/+YllXGzNrZ/V0F2ceGs36H2u9LB8CzsCi5LkF+h8R1uN6Q32BhRFz9LX6oGrpP+po3Y/e4+gwnm375dRj1vTtKVvQHCCw7Huu7puKykMi5rY/t3zZw4zKHdPVMNKi56Uw9XN4nLAqjCOd3LEuTnHCpoM3oDF8vkNdZOVuDmrtqiGlQux6x8Wr9NZbwVszLw+iIr11owvB/jeO3HgJdLqC/XSTqXkLLVTQqyqwvinhJGVA1He3lhtB5u4ZWF3T1lCfKzDgLWKxNlLqErVdZOXnYU5M0oIUVhg8PL2ZhJuofadL9WtKu+kcjNDJ0YfzCeAn7jeM5OTVibroK8tePxc5sU5GW47a+4bQFDpRBlhb25LAPdrdtVxgujrR0tmcfWUkF+vMvK83tgMrCNn6VfaJMYg1so57ZeGLlahBc3Wb54qOiWAXCJQX60SQPFNZpmdpNtb7qfpS5Z3HZwvH5hl1hZgrzQ4dj3250EuhnXdfh/aqKHXJ/eof+EVDfEar8KXAXs62fpHn6WXuZn6QttLoNrbL2Tdedn6S8pkOuhxlg6z9EgWRe3fAyPNlkfu9p7NjxqwCQAK+Kr/RXuWeVc9wgtbAiUJYwPOhy7OSZFXjdzqMOxzwzQIF22K9+og8/pGp7T3ze2uINlXwqcgVnAcZyfpXd3sCyLHMXh0AL3OAmzes51aH643UfQhX1wm9RbUPs/Nq2oi9tiA0zuDZdO6lbMAhEXS/d/gCMLzCW8z/H4wrvZlyXIrh/DcXQpdl+0j7i85AFWXrl8ABt7YTSmQ4/rur1Of0G+v83lfYM3M53t4GfpuX6WPtnpNpMn8cuASwa7iXaiyEWAVmIWiFzT4Cn3AXsVdNsc73j8QPHNrgtsXNN14mfp1TS2c/wq4N+BD7jmi/bCaESBEXPRXc3LEWSbsjJ3EWQvjLo1rOxoR+vgVwP8zdWHtEuHntV1zf2yBp69FSzHZOl6u5+lh/pZen0Bn2ircUlItSlwVAEBes7P0mMwqT7/c4COfzUmXeQJwD/4WersUrL+bZcdxJfkSTzQt3+b460nFql0m8r1PZiVdxdjoicWYxb93IDJzreDn6Vf8bO0SGz1QbjNJ62miQRaZS4MmU/jm11uaodg3+ky63hd3LP9//cAf3Mdyu+Ne0apMtjb8fjF/T6GP1eDytIClnaj3IfZHfoa6zfsZm61LpRG+ZoXRtfkSby6gAjdBtxWDSrr8eaOIcuBpdaSbgbXnCHXDVIfLt/Se7ww2q1Iknq7Fdh8HFN4NsgnHY/P8iR+thsEeS5uuw+f4YXRj7osFedJwDiH4xfWaUCugvxBmthBomDnM8oO91x4pE5HXGYo2yt2WH5JmYns28AddpTYaKKhXez3MqfoDa3FtxC3SfXB2sSWmGTvLtQT5LutBe+yEOw02hMW2Wh9bFvAck+auWeZ0Q434rYaaAtgehdV/pbAuY6n1fPnue44sr8XRn6bH/mjuEV45HkSD+SKKWvL9iWYNJHb+Fl6Qo+JMTZ95FWOp13ghdGmXfQYF+C2SONx6swf5Un8Eu4bPRznhVE3rVP4WgGj9apmbji8xAa5CrjS8bTJXhgd3ulat2F4Vzg2xteov034/bgtFhgOnNLmx/684/H1/MW3A080UY6bMDtw7ORn6fl+lj7T7vdfDSofqAaVfyvhUj9yPH4L4HIvjIZ1wTdwNO6T7ZcM4XK5wvF6IzCTb91goO1uR8wupHkS/7FbLGSAC3HfNvsKL4x26nD9n4XZMNKFefV2DbaN1DXy5FQvjLw2NbYP4xhmVE+Q/Sx9vZlhN2aV502dmqSrBpUAuB44sxpUTm/SKPlDgSHrh+3IoJPis9sgxkU9XmrgnFtxXzR1hBdGx3e4PtaznatrRsOm9wotVZDzJF5awEp+C3Cz9dd0ovJPBs50PO0Nhg62d92XbJN2WAc2uuXCAqdeN8i/fa9AR9zH0UBcYPPJMsR4H4wPvC9xzPnVoHJCCZ27KzO8MDqhQ+1/B4y70TXq6bI8iZ8eQg9WU8wtebEXRp2KPOpz3bguBvk/StgcthUr5r6JWT3lwvbAHV4Y7djmxvhFzCy+K1fmSTxU7OO1uCcdOt4Lo2Nb/NiXYGbmXbjHdrbUsZIfx+x0XJTPAnNtMvZ2ifHHrRj39+H+RzWofKgJo+Q3FJvtv9wLo8+2uf3vignRcp2/WAF8o8FjfwD82fH6o4Ab7eax7e6gTqOY+3CG9Zt3lyDnSbwYx6WalrHAPV4YHdSGSl/PC6NLClqKLwFfbaAenmHgkLghLQ8vjPZp0XOfgXsYT6NDsbNoLqn5x4BfV4PKu1osxBvbjHPXMPCk5jq2c2hmz7ZTCxglw4FLvTA63y5GaPU38EHgLtwT5wBMz5N4WYN68GrBUcP2wJ1eGL2NNuGF0T8D3y5w6mPAzDLK0KqcEt+kWJ6Dza37YroXRhu0qNLfjYn5jQpe4ow8iRvt8Yu4IDYAbvDC6ICSn/ur9r248hQNuKH8LM0LuH76swewoBpUzq4GlVFlPr/do+94zI7Vn27gHfyiGlQKJcLKk3hhQaME4HQrRLu2qP1v5IXRhZhFE0VWiP7eDuldO/S7CtxrnDXSPtBiIV7fC6PvN/HOojKsY2jhFupeGO2LmYFfp+AlHsUEls8tEjw/QHm2tpbtZ5so053AAS7l8cLoLtzjfcH4ZKcC3ymwKWbt/UcB3weOKXiJM/MkPqdR0bPvfL8SmtDTwHeB2X6WFt7frRpUNrHP/jnA1fr+CyZp0Z+KfOSYlJfvLlj01+zzT8+T+KkS2v+6th6+VdAqxlr94+3KXNf774JZ4lx0p5nzgG/kSfxiyTq1l/0+9ih4iXl5Ek8qqzwtnUjxwmga7rG9/XkEsyTy6jyJnyxQhvdZi+g4msus9rRtjI8VeOG/aeK+dwNfypP4Xsf7DsdMmJ2Hu4+wj8eBd+RJ3HD2tGpQ2dZ+eGVtRPCG7QjnW7G/38/SFYPcfyQm5/b7MbkfJtDc7heLgff5WfpUgbY3DvgtbrtN9OdljB92dp7EaYEybIXZEOAUmt809ot5El/UhB58meYmrpfaDuWH1hXSjDbtAkzD5O0oqoNPALs36r7pBkEehgkp+lAJl3vNitPtmKxXC4GlNv651hrcyVpC+2HWoZfhg1oFTMiT+I6C9TAbky6wGW7FTJzdONjqRutzm2Q7oZ2bvOcxeRJf43pSNagciAn/atWejctsZ7ECs33SBlZ0N8Xkri3bFXeXn6X7FXz3H8V9gUQ9lgA3Y0IQHwQeyZN4Zc29RmB8r+/A7DJ9ACZTWRn1cXmexCeVoAfXYkL9muFJzAKMnwD35Un8eoP339Rq0SeAQ5rUv1XAgXkS31VmQ2t5qJHNnnYHrUu5+Spmom10Cx/jpDyJL2+iDjbFZIAqYzXeakwmrYWYUJvXMdtnbQfsTnl5Ja7Nk/iooidXg8oncV8o0Y28ABxh0z0Wff+n09ql8StspzSyRde/HQibtUptXWxsO5Q9SirbSsyc0EN2NP2c/dsI20lvC+xo9eedJdbJP+VJ/IOyK7otsZ9eGG1hLbx39eAHOTVP4vNKqIN9bcc0vAeeeSmwR7N5RqpB5WSKhRV2C8uAw/wsvbeE9/8t3BNXdQP3AofkSbyiRD3w7Gh3XI+2i3/Jk7glaR/aIg52UuJA3HLGdprVGJ/ZeSXVwV24L1fuBCuBD5eR9MnP0kutq2ZVD350i4B9yhBj+/7PoPkolHbzq7LF2NZFjtk1ZVEPtouWiXHbBLlGlA8A/qtHhqkfbWYCo04dXAL8Wxc/9yorxllZF/Sz9AqML//pHvrobsQkd19U8vs/BzixRzqoHwEHly3GNXXxOLAvzU14t5PXgZNbKcZtc1n0G64Mx4RzfYPi4Wet5BFgYgMr8Zqpg68DZ3ehZfzRPIlvacXFq0FlB8y+cN28fdermNDIC2yO3Va9//diFqbs0IV1sAoTa39+m/RgfUzY2ae6uF0sw0xwz2/1jTqWZcquRpvTZY1yFnB6nsTPt+H5T7QNcWQXPHcV+FArOyEryiPssP2MLuyM7wNO9LP0gTa1/9GY1V0f76I6eBA4tswRkkN9HG2/h9Fd1i5uAk6sk3p2zRFk+xI2wEx0fAUTKdAp/giclifxL9v8/AFwNc2HpzXDdZgZ47alvawGlfGYnX/36YIPbpntJGZ1IuOcF0aHYpIz7djBOngRE68+w+4P2Ck92M7WxZFd0C6esYbDrGYWZvWUINe8iHHA1zE7KLTTcvoLcA4mc9VrHXr2Da0gnNbmTukvwLQ8ied06r1Xg8pRmED/TiQlf9p2Chf6Wfp8h9v/epil/F8BtmrjrV/DLIv/Wr1Ush2qjwMx27vt1oHbr8JEBp3did2MhtFFeGG0vW2Ux7Z46PIHzHr8a8qIrSzp2cdiJvw+TusWVPT1/N8Dzm+Ha6YBUR6O2cLqi5iVda3m99ZV8CM/S1/ssvY/ErOg51TKjZntzwpMLuOL7ORa12EXkRyGyRX9/jbccgXGZfndTtbJsC59GesBR2BW1ByE26aL9VgM/BS4qshGim0etp1in327Ei99HybJy+yy8wGUKM5vxexhNhF4b4ntMwN+Acz1s7Rr332/drAHZlnvkZQTr/u8rYOfADfkSfwKPYKti09gUgGU+U28htktfC4mJ8VznX7WYT3wMtYF9sTELe6GWRa60yAi/QYm/+ojmNU79wC3d6slMISFsBdmqed+QAWzGqtRlmGC738FXGfTovYMNtvb++xvd8zk7w5DjJxexKRCXIRZzZgCvy6Sh6ILR44H2E6qr/0PliBoJfAwZjVnhllp97tOueVK/ibGWy3YD7Nr+uaOAvwgJjfKXcAtZSRuWqsEeZCXszFmaeTGmJ1tV2KWTT7fS72/w/P25SnY0QrTRvbZ18Ps1PysHXYtBhZ3k0+wZKHeCJMkahNMhMqr9tlf8LN0FWsJ1r2xMSZx0SjbGb0AvFCb32ItqIcx9pvY0dbDRva/r9r6WIFJMfAw8Fivd0pCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBCiSxmmKhCivVSDyhhgMrDAz9L5DRx/MGbJ8BI/S+cN8O/jeTMx0zw/S5cMcV/67t3vb/WoW85qUJkOjBni3FnVoDIWmOxn6bQhnnUqsNzP0ll1/n0sZoOLJX6WzhikTPP7ytxXf/WOr6mb6Zg0rAtcnq3MtrGuPg8h2ibEk+1HP6bmb2B2UpniZ2m9dI9TreAut8f2Z7y9LsBYYEqd60yvEd9pwHxblqG2Jeo7tl7ZFtjfYIwFplaDyhg/S6cMctzkge5lhXqqLe8sYKIVzAXApH6d0FRbV/Nr66caVJYPIqB/7SRrnqXRZ5MgC9FjYjyz1jrlze2s+rLbja8GlT37i7K1CPus3zHVoDJxICu5VtCqQeWvVl6/6wxlCc+rIz5DCdK8wazPAcq3xOH42rqbUiuo9pnmAvfZulsyxKVmVoPKgv51U+KzSZCF6AExnlojhv1FZbwVlT5Lbv4AFiPW4uuz4uYNccvpwIQBLNmhmF/2ELxe+awwNuKumWyfeVL/jsjP0iXVoDIBk1p2OjCpgXvPrQaVCQ2Id0cYrs9FiJZg7/pvAAAC5ElEQVSK8ZgaMZzVX/CstTbJz9Jx/QWqn3+3z/d6sLUMB+Ng6zd1sY7bxbQaYRzbwPFTrZU6YCfkZ+lyW3eTGrz32JoOUIIsxFrGwbzpM55fR1TqDaEn2nOXWCGf389qHoglA1jEU/v9WydZYC3ZMVaUxwzSmY23AjqvjBtb18MMjHtoZjc2FrkshGgtY/qJUa3gzOwvrn6WDhvAXdFnVc+zAj+5xtLszwzMFlW1VvJf3SXAzYOUdeYAQjXfz9IJDbggptdxgUwYQBjnVYPKNOtmmDmIq6HPgi5tbzs/S6f1jRga9GU7PZsEWYg109XRF+rWX5CnYyb3Jtfx9863x0/uZyXPt2FuLXFDuE58+Vk6o8+dUw0qU+ucv3yQ+hmL2YyhlnGN+Ib9LJ1UDSr30Zgve5om9YRYc1jQz30xq0YYpgBT6ojLxBo3w+QaIe2b3JtYe60BrOTJ/O2msVMaKOuUNk3q1VqrY6wwDhRj3Vd3fzfZaYV3WE3ndbPj7SfYc+ZWg8qe3dJY5EMWorWis6BGTOpFOozvZ/2NqRHksdYq7vv1DeMPtj7Wge65pJ9LY0a3RhXYTmm+Fcbx/f5teY21X/Z9l1tXyXIrzGMkyEKsHfSJ49hqULm5NrrAhsT1n/WfXCMQ4/wsHdb3AzatGcoPJlSzrHW93FrM3cwkaw3PHUAYZ1gXzWCTcBMLivIS3pxg7IpJPrkshGiDlWzjZW+2boTFQ/hy+4R2fn/L1s/S5dWgMs8eM9FOjtWzAMc5FnVmHeFryQRWv2eaNJClamONJ9VY0NNqlkRP7td5FX03kwq4PCTIQvSwKM+vBpVx/P1k2ww7ZL/ZiszEGrfEvEGs3z4hmkyJUQgFqReJACZkb1wD9bOknjDW1N104OaazqxvxeOCZgTVXn9KHSu56WcTQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgjRaf4f4KgGTQwIZp4AAAAASUVORK5CYII=";


/*
 * Call the mainFunc when the document is loaded
 * @Duedo.Conf.MainFunc
*/
document.addEventListener("DOMContentLoaded", function() {
    //Get client info | Core/Duedo.Client.js
    Duedo.GetClientInfo(false);
    /*Start mainfunct*/
    if(Duedo.IsFunc(self[Duedo.Conf.MainFunc]))
        self[Duedo.Conf.MainFunc].call();
});

/*
==============================
Duedo.Consts
Author: http://www.edoardocasella.it

Duedo constants and "macros"
==============================
*/

/*Duedo types*/
Duedo.SPRITESHEET      = 1;
Duedo.SSEQUENCE        = 2;
Duedo.PARTICLE_SYSTEM  = 3;
Duedo.PARTICLE         = 4;
Duedo.BUTTON           = 5;
Duedo.PARALLAX         = 6;
Duedo.LAYER            = 7;
Duedo.IMAGE            = 8;
Duedo.TEXT             = 9;
Duedo.SOUND            = 10;
Duedo.VIEWPORT         = 11;
Duedo.STATE 		   = 12;
Duedo.CIRCLE 		   = 13;
Duedo.DIMENSION 	   = 14;
Duedo.LINE 			   = 15;
Duedo.POINT 		   = 16;
Duedo.POLYGON 		   = 17;
Duedo.RECTANGLE 	   = 18;
Duedo.EVENT 		   = 19;
Duedo.BODY             = 20;
Duedo.WORLD            = 21;
Duedo.QUADTREE         = 22;
Duedo.ANIMATIONMANAGER = 23;


//2DContext.MeasureText
Duedo.MeasureText = function (str, font) {
    var cv = document.createElement("canvas");
    var ctx = cv.getContext("2d");
    ctx.font = font;
    return ctx.measureText(str).width;
};


/*Consts*/
Duedo.PI2         = Math.PI * 2;
Duedo.SPACE_WIDTH = Duedo.MeasureText(' ');
Duedo.HEX_MAX_32BIT_UNSIGNEDINT = 0x70000000;


/*PRIVATE: Auto unique ID for each object*/
Duedo.__ObjectIDs = 0;
Duedo.__GenNextObjID = function() {
    return Duedo.__ObjectIDs++;
};
/*
==============================
Duedo.StaticCommon
Author: http://www.edoardocasella.it
Retrieve client info
==============================
*/

/*Client info "struct"*/
Duedo.ClientInfo = {
	/*Bool*/
	Initialized: false,
    /*Browser name*/
    Browser: null,
    /*Browser version*/
    BrowserVersion: null,
    /*Client device*/
    Device: null,
    /*Os bit-version*/
    BitVersion: null,
    /*Device is touch enabled*/
    IsTouch: false,
    /*Endianness*/
    Endianness: null,
    /*Window dimension*/
    Window: { Width: null, Height: null },

    WebGL: false,
    WebAudio: false,
    Ogg:  false,
    Opus: false,
    Mp3:  false,
    Wav:  false,
    M4a:  false,
    Webm: false

};



/*
 * GetClientInfo
 * @public
 * Mem the client info (ex. is mobile? browser, os version, screen size...)
*/
Duedo.GetClientInfo = function(print_log) {

	/*Get browser info*/
    Browser                         = Duedo.BrowserInfo();
    Duedo.ClientInfo.Browser        = Browser[0];
    Duedo.ClientInfo.BrowserVersion = Browser[1];

    //Bit version
    Duedo.ClientInfo.BitVersion = window.navigator.platform;

    //Endianness
    if(!Duedo.ClientInfo.Endianness)
        Duedo.ClientInfo.Endianness = Duedo.Utils.Endianness();

    if ("ontouchstart" in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1)) {
        Duedo.ClientInfo.IsTouch = true;
    }

    //Audio
    Duedo._CheckAudioSupport();
  

    Duedo.ClientInfo.Initialized = true;

    if (print_log)
        console.log(Duedo.ClientInfo);

};





Duedo._CheckAudioSupport = function () {
    
    var audioElement = document.createElement('audio');
    var result = false;

    try {

        if (result = !!audioElement.canPlayType) {

            if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Ogg = true;
            }

            if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, '')) {
                Duedo.ClientInfo.Opus = true;
            }

            if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
                Duedo.ClientInfo.Mp3 = true;
            }

            // Mimetypes accepted:
            //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
            //   bit.ly/iphoneoscodecs
            if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Wav = true;
            }

            if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
                Duedo.ClientInfo.M4a = true;
            }

            if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Webm = true;
            }
        }
    }
    catch (e) {
    }


    /*WebAudio*/
    Duedo.ClientInfo.WebAudio = Duedo.Utils.Can.WebAudio();

};
/*
==========================================================================================
Duedo.Require

Author: Andy VanWagoner, https://github.com/thetalecrafter/require
Notes:

 * _.require v0.3 by Andy VanWagoner, distributed under the ISC licence.
 * Provides require function for javascript.
 *
 * Copyright (c) 2010, Andy VanWagoner
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
==========================================================================================
*/

(function() {
    
    var map = {}, root = [], reqs = {}, q = [], CREATED = 0, QUEUED = 1, REQUESTED = 2, LOADED = 3, COMPLETE = 4, FAILED = 5;
 
    function Requirement(url) {

        this.url = url;
        this.listeners = [];
        this.status = CREATED;
        this.children = [];
        reqs[url] = this;

    }
 
    Requirement.prototype = 
    {


        push: function push(child) { this.children.push(child); },
        


        check: function check() {
            
            var list = this.children, i = list.length, l;

            while (i) 
            { 
                if (list[--i].status !== COMPLETE) 
                    return; 
            }
 
            this.status = COMPLETE;

            for (list = this.listeners, l = list.length; i < l; ++i) 
            { 
                list[i](); 
            }
    	},



     	loaded: function loaded() {
            
            this.status = LOADED;
            this.check();

            if (q.shift() === this && q.length) 
                q[0].load();
        },


        failed: function failed() {

            this.status = FAILED;

            if (q.shift() === this && q.length) 
                q[0].load();
        },



        load: function load() { // Make request.

            var r = this, d = document, s = d.createElement('script');

            s.type = 'text/javascript';
            s.src = r.url;
            s.requirement = r;

            function cleanup() { // make sure event & cleanup happens only once.
                
                if (!s.onload) 
                    return true;

                s.onload = s.onerror = s.onreadystatechange = null;
                d.body.removeChild(s);
            }

            s.onload = function onload() { 
                if (!cleanup()) 
                    r.loaded(); 
            };

            s.onerror = function onerror() { 
                if (!cleanup()) 
                    r.failed(); 
            };

            if (s.readyState) { // for IE; note there is no way to detect failure to load.
                
                s.onreadystatechange = function () { 
                    if (s.readyState === 'complete' || s.readyState === 'loaded') 
                        s.onload(); 
                };
            }

            r.status = REQUESTED;
            d.body.appendChild(s);
        },


        request: function request(onready) {

            this.listeners.push(onready);

            if (this.status === COMPLETE) 
            { 
                onready(); return; 
            }
 
            var tags = document.getElementsByTagName('script'), i = tags.length, parent = 0;

            while (i && !parent) 
            { 
                parent = tags[--i].requirement; 
            }

            (parent || root).push(this);

            if (parent) 
                this.listeners.push(function() { parent.check(); });
 
            if (this.status === CREATED) 
            {
                this.status = QUEUED;

                if (q.push(this) === 1) 
                { 
                    this.load(); 
                }
            }
        }
    };


    function resolve(name) {

        if (/\/|\\|\.js$/.test(name)) 
            return name;

        if (map[name]) 
            return map[name];

        var parts = name.split('.'), used = [], ns;

        while (parts.length) 
        {
            if (map[ns = parts.join('.')]) 
                return map[ns] + used.reverse().join('/') + '.js';

            used.push(parts.pop());
        }

        return used.reverse().join('/') + '.js';
    }
    

    function absolutize(url) {

        if (/^(https?|ftp|file):/.test(url)) 
            return url;

        return (/^\//.test(url) ? absolutize.base : absolutize.path) + url;
    }


    (function () {
        var tags = document.getElementsByTagName('base'), href = (tags.length ? tags.get(tags.length - 1) : location).href;
        absolutize.path = href.substr(0, href.lastIndexOf('/') + 1) || href;
        absolutize.base = href.split(/\\|\//).slice(0, 3).join('/');
    })();
     

    function require(arr, onready) {

        if (typeof arr === 'string') 
            arr = [ arr ]; // make sure we have an array.

        if (typeof onready !== 'function') 
            onready = false;

        var left = arr.length, i = arr.length;

        if (!left && onready) 
            onready();

        // Update or create the requirement node.
        while (i) 
        { 
            var url = absolutize(resolve(arr[--i])), req = reqs[url] || new Requirement(url);

            req.request(function check() 
                { 
                    if (!--left && onready) 
                        onready(); 
                });
        }
    }
    


    require.map = function mapto(name, loc) { map[name] = loc; };
    require.unmap = function unmap(name) { delete map[name]; };
    require.tree = root;


    /*Duedo.Require*/
    Duedo.Require = require;
    
})();



/*
==============================
Duedo.Time
Author: http://www.edoardocasella.it
==============================
*/




Duedo.Time = function ( autostart ) {
    this.Autostart   = (autostart !== undefined ? true : false);
    this.StartTime   = 0;
    this.LastTime    = 0;
    this.ElapsedTime = 0;
    this.Counting    = false;
    this.HResTime    = false;
};






Duedo.Time.prototype.Start = function () {

    if(!Duedo.Utils.IsNull(self.performance["now"]) && !Duedo.Utils.IsNull(self["performance"]))
    {
        this.StartTime = self.performance.now();
        this.HResTime = true;
    }
    else
    {
        this.StartTime = Date.now();
    }

    this.LastTime = this.StartTime;

    this.Counting = true;
};








Duedo.Time.prototype.GetElapsed = function () {
    this.Delta();
    return this.ElapsedTime;
};







Duedo.Time.prototype.Delta = function () {

    if (this.Autostart && !this.Counting) {

        this.Start();

    } 


    if (this.Counting)
    {
        var now, diff;

        if (this.HResTime === true)
        {
            now = self.performance.now();
        }
        else
        {
            now = Date.now();
        }


        /*microseconds*/
        diff = 0.001 * (now - this.LastTime);

        this.LastTime = now;

        this.ElapsedTime += diff;

    }
    else
    {
        return 'Duedo.Time: No counting';
    }
        


    return diff;
};

/*
==============================
Duedo.Matrix2
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Matrix2 = function (n11, n12, n21, n22) {
    
    /*Matrix array*/
    this.Matrix = new Array();

    return this.Set(
        n11, n12,
        n21, n22
    );
};


Duedo.Matrix2.prototype.GetMatrix = function () {
    return this.Matrix;
};


Duedo.Matrix2.prototype.Set = function (n11, n12, n21, n22) {
    this.Matrix[0] = n11; this.Matrix[1] = n12;
    this.Matrix[2] = n21; this.Matrix[3] = n22;
    return this;
};


Duedo.Matrix2.prototype.Determinant = function () {
    return (this.Matrix[0] * this.Matrix[3]) - (this.Matrix[2] * this.Matrix[1]);
};


Duedo.Matrix2.prototype.Clone = function () {
    return new Duedo.Matrix2(this.Matrix[0], this.Matrix[1], this.Matrix[2], this.Matrix[2]);
};
/*
==========================================
Duedo.Vector2
Author: http://www.edoardocasella.it
==========================================
*/

Duedo.Vector2 = function (x, y) {

    this.X = (x || 0);
    this.Y = (y || 0);

};


/*PUBLIC STATIC*/
Duedo.Vector2.Compare = function (vec2a, vec2b) {
    
    if(Duedo.Utils.IsNull(vec2b) || Duedo.Utils.IsNull(vec2a))
        return false;
    
    return (vec2a.X === vec2b.X && vec2a.Y === vec2b.Y);
};


Duedo.Vector2.DotProduct = function (v1, v2) {
    return (v1.X * v2.X) + (v1.Y + v2.Y);
};

Duedo.Vector2.Subtract = function (v1, v2) {
    return new Duedo.Vector2(v1.X - v2.X, v1.Y - v2.Y);
};

Duedo.Vector2.Negate = function (v) {
    v.X *= -1;
    v.Y *= -1;
    return v;
};

Duedo.Vector2.Perpendicular = function (v, negate) {
    negate = negate === true ? -1 : 1;
    return new Duedo.Vector2(negate * -v.Y, negate * v.X);
};


/*PUBLIC METHODS*/
Duedo.Vector2.prototype.ToGenericObject = function() {
    return {x: this.X, y: this.Y};
}

Duedo.Vector2.prototype.Reset = function () {
    this.X = 0;
    this.Y = 0;
    return this;
}

Duedo.Vector2.prototype.ToArray = function () {
    return new Array(this.X, this.Y);
};

Duedo.Vector2.prototype.Double = function () {
    this.X *= this.X;
    this.Y *= this.Y;
    return this;
};

Duedo.Vector2.prototype.Set = function(x, y) { 
    this.X = x;
    this.Y = y;
    return this;  
};

Duedo.Vector2.prototype.SetBoth = function(scalar) {
    this.X = scalar;
    this.Y = scalar;
    return this;
};

Duedo.Vector2.prototype.AddScalar = function (scalar) {
    this.X += scalar;
    this.Y += scalar;
    return this;
};

Duedo.Vector2.prototype.SubtractScalar = function (scalar) {
    this.X -= scalar;
    this.Y -= scalar;
    return this;
};

Duedo.Vector2.prototype.MultiplyScalar = function (scalar) {
    this.X *= scalar;
    this.Y *= scalar;
    return this;
};

Duedo.Vector2.prototype.DivideScalar = function (scalar) {

    if (scalar === 0)
        return this.MultiplyScalar(0);

    this.X /= scalar;
    this.Y /= scalar;

    return this;
};

Duedo.Vector2.prototype.Add = function (vec2) {
    this.X += vec2.X;
    this.Y += vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Subtract = function(vec2) {
    this.X -= vec2.X;
    this.Y -= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Multiply = function(vec2) {
    this.X *= vec2.X;
    this.Y *= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Divide = function(vec2) {
    this.X /= vec2.X;
    this.Y /= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.DivideScalar = function (n) {
    
    var complex = 1.0 / n;

    if (complex === 0)
        this.X = this.Y = 0;
    else
    {
        this.X *= complex;
        this.Y *= complex;
    }
    
    return this;
};


Duedo.Vector2.prototype.DotProduct = function(vec2) {
    return (this.X * vec2.X) + (this.Y * vec2.Y);
};

Duedo.Vector2.prototype.GetPerpendicular = function() { 
    var pv = new Duedo.Vector2(0, 0);
    pv.X = this.Y;
    pv.Y = 0 - this.X;
    return pv;
};

Duedo.Vector2.prototype.Normal = function(){ 
    var pv = this.GetPerpendicular();
    return pv.Normalize();
};

Duedo.Vector2.prototype.Magnitude = function () {
    return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
};

Duedo.Vector2.prototype.Normalize = function () {
    
    var mag = this.Magnitude();
    if (mag != 0)
        this.DivideScalar(mag);
    return this;
};

Duedo.Vector2.prototype.Edge = function (vec2) {
    this.Subtract(vec2);
    return this;
};

Duedo.Vector2.prototype.SetX = function (x) {
    this.X = x;
    return this;
};

Duedo.Vector2.prototype.SetY = function (y) {
    this.Y = y;
    return this;
};

Duedo.Vector2.prototype.GetX = function () {
    return this.X;
};

Duedo.Vector2.prototype.GetY = function () {
    return this.Y;
};

Duedo.Vector2.prototype.Clone = function () {
    return new Duedo.Vector2(this.X, this.Y);
};

Duedo.Vector2.prototype.Translate = function (tx, ty) {
    if (tx instanceof Duedo.Vector2)
    {
        return this.Add(tx);
    } 
    else
    {
        this.X += tx;
        this.Y += ty;
        return this;
    }
};

Duedo.Vector2.prototype.SetMagnitude = function (mag) {
    this.Normalize();
    return this.MultiplyScalar(mag);
};

Duedo.Vector2.prototype.Negate = function () {
    return this.MultiplyScalar(-1);
};

Duedo.Vector2.prototype.DistanceTo = function (vec2) {
    var dx = this.X - vec2.X, dy = this.Y - vec2.Y;
    return dx * dx + dy * dy;
};

Duedo.Vector2.prototype.SetFromArray = function (array) {
    this.X = array[0];
    this.Y = array[1];
    return this;
};

Duedo.Vector2.prototype.Equals = function (vec2) {
    return (this.X === vec2.X && this.Y === vec2.Y);
};

Duedo.Vector2.prototype.SetFromMax = function (vec2) {
    if (this.X < vec2.X)
        this.X = vec2.X;
    if (this.Y < vec2.Y)
        this.Y = vec2.Y;
    return this;
};

Duedo.Vector2.prototype.SetFromMin = function (vec2) {
    if (this.X > vec2.X)
        this.X = vec2.X;
    if (this.Y > vec2.Y)
        this.Y = vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Copy = function (vec2) {
    this.X = vec2.X;
    this.Y = vec2.Y;
    return this;
};


Duedo.Vector2.prototype.ApplyMatrix2 = function (matrix2) {
    this.X = this.X * matrix2[0] + this.Y * matrix2[1];
    this.Y = this.X * matrix2[2] + this.Y * matrix2[3];
    return this;
};


Duedo.Vector2.prototype.GetAngle = function () {
    return Math.atan2(this.Y, this.X);
};

Duedo.Vector2.prototype.Abs = function () {
    this.X = Math.abs(this.X);
    this.Y = Math.abs(this.Y);
    return this;
};

Duedo.Vector2.prototype.Limit = function ( /*scalar*/ l) {
    if (this.Magnitude() > l)
        this.SetMagnitude(l);
    return this;
}

Duedo.Vector2.prototype.SetMagnitude = function ( /*scalar*/ m) {
    this.Normalize();
    this.MultiplyScalar(m);
    return this;
}
/*
==========================================
Duedo.Utils
Author: http://www.edoardocasella.it

Notes:
- Generic utils: like rand, browser info, merging, colors, conversions etc...
- Text utils:    utilities to manage strings
- Can utils:     improve compatibility and other similar stuff
==========================================
*/

/*Utils - generic */
Duedo.Utils      = function () {};
/*Text - string utilities*/
Duedo.Utils.Text = function () {};
/*Can - support methods*/
Duedo.Utils.Can  = function () {};
/*Cookie*/
Duedo.Cookie = function () {};

/*
=====================================
POLYFILL
=====================================
*/
/* Polyfill trim*/
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,'');
    }
}


/*Polyfill bind*/
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function () {
        var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
}


/*
 * Object.ExtendDeeply
 * Copy an object into another (adding subobjects)
*/
Object.Extends = function (destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor &&
         source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

Object.ExtendDeeply = Object.Extends;
Duedo.Extends = Object.Extends;

/*
 * Extend
 * simple
*/
Duedo.Extend = function(target, other) {

    if(Duedo.Null(target)) {
        target = {};
    }

    for(var i in other) {
        if(typeof target[i] === "undefined") {
            target[i] = other[i]; 
        }
    }

    return target;
};



/*IE Ver*/
Duedo.GetIEVersion = function() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;
    else
        return 0;
}



/*
 * Get browser info
 * Thanks to Joby Joseph for his research on the net
 * return array: array[0] = browsername, array[1] = browserversion
*/
Duedo.BrowserInfo = function() {

    var iever = Duedo.GetIEVersion();
    if (iever != 0)
        return ["IE", iever];

    var N = navigator.appName;
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
        M[2] = tem[1];

    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M;
};


/*
 * IsConsoleOpen
 * Check whether the console is currently open
*/
Duedo.IsConsoleOpen = function () {

    if (window.console && window.console['firebug']) {
        return true;
    }

    if (window.console) {
        console.profile();
        console.profileEnd();

        if (console.clear) {
            console.clear();
        }

        if (console['profiles']) {
            return console['profiles'].length > 0;
        }
    }

    return false;

};


/*
 * Delay
 * Simple delay. Stops the process for 'ms' time
*/
Duedo.Delay = function (ms) {
    var stTime = new Date().getTime();
    while (1)
        if ((new Date().getTime() - stTime) >= ms)
            break;
};


/*Funcs*/
Duedo.Random = function (max) { return Math.floor(Math.random() * (max - 0 + 1)) + 0; };
Duedo.IsFunc = function (func) { return typeof func === "function"; };
Duedo.ReloadPage = function (clearCache) { return window.location.reload(clearCache); };
Duedo.Goto = function (url, blank) { window.open(url, blank === true ? "_blank" : "_self"); };
Duedo.Null = function (data) { return typeof data === "undefined" || data === null; };
Duedo.RemoveSpaces = function (string) { return string.replace(/\s/g, ""); };
Duedo.Is32Bit = function (value) { /*ADD*/ };
Duedo.Is64Bit = function (value) { /*ADD*/ };

/*Array.isArray polyfill*/
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
};
Duedo.IsArray = function (value) {
    if (typeof value == "undefined") return false;
    return Array.isArray(value);
}




/*
 * Can.Duedo
 * Check if Duedo can be used on the current client
*/
Duedo.Utils.Can.Duedo = function() {
    return Duedo.Utils.Can.Canvas();
};



/*
 * Can.Canvas
 * Check canvas rendering support
 * return: bool
*/
Duedo.Utils.Can.Canvas = function() {

    var cv = document.createElement("canvas");

    if(!cv)
        return false;
    else
    {
        if(!cv.getContext)
            return false;
    }

    return true;
};





/*
 * Can.WebAudio
 * Check WebAudio API support
 * return: bool
*/
Duedo.Utils.Can.WebAudio = function() {

    var API_AUDIO = ["AudioContext", "webkitAudioContext"];

    for( var i in API_AUDIO )
    {
        if( !!window[API_AUDIO[i]] )
        {
            return API_AUDIO[i];
        }
    }


    return false;

};



/*
 * Can.BlendModes
 * Thanks to: PIXI.js
*/
Duedo.Utils.Can.BlendModes = function() {

    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    var context = canvas.getContext('2d');

    context.fillStyle = '#000';
    context.fillRect(0,0,1,1);
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = '#fff';
    context.fillRect(0,0,1,1);

    return context.getImageData(0,0,1,1).data[0] === 0;

};




/*
 * Can.PlayType
 * Check if the browser can play a certain sound by his mime type
 * return: bool
*/
Duedo.Utils.Can.PlayType = function( MIME ) {

    var testElement = document.createElement(MIME.substring(0, 5));

    if (testElement.canPlayType)
    {
        var isPlayable = testElement.canPlayType(MIME);

        if ((isPlayable.toLowerCase() == 'maybe') || (isPlayable.toLowerCase() == 'probably'))
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    else
    {
        return -1;
    }

};






/*
 * Endianness
 * Get host machine endianness
 * Thanks to TooTallNate https://gist.github.com/TooTallNate/4750953
*/
Duedo.Utils.Endianness = function() {
    
    var b = new ArrayBuffer(4);
    var a = new Uint32Array(b);
    var c = new Uint8Array(b);
    
    a[0] = 0xdeadbeef;
    
    if (c[0] == 0xef) 
        return 'LE';
    if (c[0] == 0xde) 
        return 'BE';
    
    throw new Error('unknown endianness');

};



/*
 * GetMimeType
 * @private
 */
Duedo.Utils.GetMimeType = function (ext) {

    if (Duedo.Utils.IsNull(ext))
    {
        throw "Duedo.Utils.GetMimeType: was not given an extension";
    }

    switch (ext)
    {
        case "mp4":
            return 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        case "ogg":
            return 'video/ogg; codecs="theora, vorbis"';
        case "webm":
            return 'video/webm; codecs="vp8, vorbis"';
        case "mp3":
            return 'audio/mpeg';
        case "wav":
            return "audio/wav";
        default:
            return null;
    }


};



/*
 * HexToRGBA
 * Convert HEX color to RGBA
 * @hex to convert
 * @opacity: 0 to 100
*/
Duedo.Utils.HexToRGBA = function(hex, opacity) {

    if(hex.indexOf('#') !== -1)
        hex = hex.replace('#', '');

    if(Duedo.Utils.IsNull(opacity))
        opacity = 100;

    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+ r +','+ g +','+ b +','+ opacity/100 +')';

    return result;
};



Duedo.Utils.RandRGB = function () {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
};

Duedo.Utils.RandRGBA = function (alpha) {
    return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + (alpha ? alpha : (Math.random().toFixed(3)))+ ')';
};



/*
 * RGBToHex
 * Convert RGB color to Hex
*/
Duedo.Utils.RGBToHex = function(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};



/*
 * GetBase64Image
 * Convert image to DataURL
*/
Duedo.Utils.GetBase64Image = function(img, DataInfo) {

    var canvas    = document.createElement("canvas");
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    dataURL = canvas.toDataURL("image/png");

    if(Duedo.Utils.IsNull(DataInfo) || DataInfo === true)
    {
        return dataURL;
    }
    else if(DataInfo === false)
    {
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    
};



/*
 * ResizeProportionally
 * Resize a dimension maintaining the aspect ratio
*/
Duedo.Utils.ResizeProportionally = function(sW, sH, dW, dH) {

    var ratio = Math.min(dW / sW, dH / sH);
    
    return {
        Width:  sW * ratio,
        Height: sH * ratio
    }

};



/*
 * IsDataURL
 * Detect if a given string is DataUrl
 * @return: bool
 * Thanks to bgrins: https://gist.github.com/bgrins/6194623
*/
Duedo.Utils.IsDataURL = function(string) {
    return !!string.match(Duedo.Utils.IsDataURL.regex);
};
Duedo.Utils.IsDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;


/*
 * MouseToCanvas
 * 
 * @MLocation: mouse location (relative to document) 
 * @Canvas: canvas object
 * Get mouse coordinates on the canvas
 * @return: Duedo.Vector2
*/
Duedo.Utils.MouseToCanvas = function ( MLocation, Canvas ) {
    
    var Bbox = Canvas.getBoundingClientRect();

    return new Duedo.Vector2( 
        (MLocation.X - Bbox.left) * (Canvas.width / Bbox.width),  
        (MLocation.Y - Bbox.top) * (Canvas.height / Bbox.height)
    );

};



/*
 * Rand
 * @min: number min value
 * @max: number max value
*/
Duedo.Utils.RandInRange = function ( min, max ) {
     return Math.random() * (max - min) + min;
};

/*
 * Rand -1 +1
*/
Duedo.Utils.RandM1T1 = function () {
    return Math.random() * 2 - 1;
};


/*
 * IsNull
 * !To remove and replace with Duedo.Null
*/
Duedo.Utils.IsNull = function( val ) {
    return Duedo.Null(val);
};


/*
 * AreNull
 * Check if an array contains a null value
 * all = true ? check if an array contains only null values
*/
Duedo.Utils.AreNull = function(ar, all) {

    if(typeof both === "undefined")
        both = false;

    for(var i in ar)
        if(Duedo.Null(ar[i]))
            return true;
};



/*
 * MergeObjects
 * Merge 2 objects
 * return: third object
 */
Duedo.Utils.MergeObjects = function (obj1, obj2) {

    var obj3 = {};

    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

    return obj3;

};


/* 
 * MergeObjectsDeep
 * Merge 2 objects with subobjects
 * return: third object
 */
Duedo.Utils.MergeObjectsDeep = function ( obj1, obj2 ) {
    //??????????????????????????????????????????????????????????
};


/*
 * Deg2Rad
 * Convert degrees into radians
*/
Duedo.Utils.Deg2Rad = function( deg ) {
    return deg * (Math.PI / 180);
};
Duedo.Utils.DegToRad = Duedo.Utils.Deg2Rad;
var deg2rad = Duedo.Utils.Deg2Rad;

/*
 * Rad2Deg
 * Convert radians into degrees
*/
Duedo.Utils.Rad2Deg = function( rad ) {
    return rad * (180 / Math.PI);
};
Duedo.Utils.RadToDeg = Duedo.Utils.Rad2Deg;



/*
 * SortArrayAscending
 * @array: array of objects to sort
 * @property: porperty you want to sort
*/
Duedo.Utils.SortArrayAscending = function(array, property) {

    return array.sort(function(a, b) {
            
            if(a[property] < b[property])
                return -1;
            else if(a[property] > b[property]) 
                return 1;
            else 
                return 0;

        });

};



/*
 * ShuffleArray
 * Shuffle the given array
 * @return the given array
*/
Duedo.Utils.ShuffleArray = function(array){

    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;

};


/*
 * SortArrayDescending
 * @array: array of objects to sort
 * @property: porperty you want to sort
*/
Duedo.Utils.SortArrayDescending = function(array, property) {

    return array.sort(function(a, b) {

            if(a[property] < b[property])
                return 1;
            else if(a[property] > b[property]) 
                return -1;
            else 
                return 0;
        });

};



/*
 * Text.ClearBetween
 * //
 * @string: the original string
 * @from: string/char prefix
 * @to: string/char suffix
*/
Duedo.Utils.Text.ClearBetween = function ( string, from, to ) {

    var SUB;
    
    while( (SUB = Duedo.Utils.Text.Between(string, from, to))  !== '' )
    {
        string = string.replace(from + SUB + to, '');
    }

    return string;

};



/*
 * Text.Between
 * Get string between "prefix" and "suffix"
 * @string: the string
 * @prefix: prefix
 * @suffix: suffix
*/
Duedo.Utils.Text.Between = function (string, prefix, suffix) {

    var s = string;

    var i = s.indexOf(prefix);

    if (i >= 0)
    {
        s = s.substring(i + prefix.length);
    }
    else
    {
        return '';
    }
    if (suffix)
    {
        i = s.indexOf(suffix);

        if (i >= 0)
        {
            s = s.substring(0, i);
        }
        else
        {
            return '';
        }
    }

    return s;
};



/*
 * Text.ReplaceCharsAll
 * Replace all characters === "char" with "repWith"
 * @string: string
 * @char: the char to replace
 * @repWidth: the char to replace with
*/
Duedo.Utils.Text.ReplaceCharsAll = function ( string, char, repWith ) {

    if( char instanceof Array )
    {
        for( var i in char )
        {
            string = Duedo.Utils.Text.ReplaceCharsAll( string, char[i], repWith );
        }
    }
    else
    {
        var regex = new RegExp(Duedo.Utils.Text.EscapeRegExp(char), 'g');

        string = string.replace(regex, repWith);
    }

    return string;

};



/*
 * Text.EscapeRegExp
 *
*/
Duedo.Utils.Text.EscapeRegExp = function(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}



/*
 * Text.ReplaceSpace
 * Replaces all spaces
 * @string: the string
*/
Duedo.Utils.Text.ReplaceSpaces = function (string) {
    return Duedo.RemoveSpaces(string);
};




/*
 ================================================
 * Duedo.Cookie
 ================================================
*/


/*
 ========================
 * SetCookie
 ========================
*/
Duedo.Cookie.SetCookie = function (name, value, days) {

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

/*
 ========================
 * ReadCookie
 ========================
*/
Duedo.Cookie.ReadCookie = function (name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
};


/*
 ========================
 * EraseCookie
 ========================
*/
Duedo.Cookie.EraseCookie = function (name) {
    Duedo.Cookie.SetCookie(name, "", -1);
};

/*
==============================
Duedo.Units
Author: http://www.edoardocasella.it

Notes:
Pixels to meters conversion
Meters to pixels conversion
based on Duedo.Conf.PixelsInMeter
==============================
*/


Duedo.Units = function() { };

/*
 * Pixels to meters
*/
Duedo.Units.P2M = function(px) {
	return px / Duedo.Conf.PixelsInMeter;
};

/*
 * Meters to pixels
*/
Duedo.Units.M2P = function(m) {
	return m * Duedo.Conf.PixelsInMeter;
};

Duedo.Units.DegToRadians = function(degrees) {
	return degrees * Math.PI / 180;
};


DUnits = Duedo.Units;
window.DToPixels = DUnits.M2P;
window.DPixel2Meter = DUnits.P2M;
/*
==============================
Duedo.Easing
Author: http://www.edoardocasella.it

Easing functions
==============================
*/


Duedo.Easing = function(){ };


/*
 * Quadratic
 * @static public
*/
Duedo.Easing.Quadratic = function (value) {
    return Math.pow(value, 2);
};


/*
 * EaseOut
 * @static public
*/
Duedo.Easing.EaseOut = function (value) {
    return 1 - Math.pow(1 - value, 2);
};


/*
 * EaseIn
 * @static public
*/
Duedo.Easing.EaseIn = function (value) {
    return this.Quadratic(value);
};


/*
 * Linear
 * @static public
*/
Duedo.Easing.Linear = function (value) {
    return value;
};


/*
 * EaseInOut
 * @static public
*/
Duedo.Easing.EaseInOut = function (value) {
    return value - (Math.sin( value * (Math.PI * 2)) / (Math.PI * 2));
};


/*
 * CircularIn
 * @static public
*/
Duedo.Easing.CircularIn = function(value) {
    return 1 - Math.sqrt( 1 - value * value );
};


/*
 * CircularOut
 * @static public
*/
Duedo.Easing.CircularOut = function(value) {
    return Math.sqrt( 1 - ( --value * value ) );
};


/*
 * CircularInOut
 * @static public
*/
Duedo.Easing.CircularInOut = function(value) {
    
    if ( ( value *= 2 ) < 1) 
    {
        return - 0.5 * ( Math.sqrt( 1 - value * value) - 1);
    }   
        
    return 0.5 * ( Math.sqrt( 1 - ( value -= 2) * value) + 1);
};


/*
 * BackIn
 * @static public
*/
Duedo.Easing.BackIn = function(value){
    var s = 1.70158;
    return value * value * ( ( s + 1 ) * value - s );
};


/*
 * BackOut
 * @static public
*/
Duedo.Easing.BackOut = function(value) {
    
    var s = 1.70158;
    
    return --value * value * ( ( s + 1 ) * value + s ) + 1;
};


/*
 * BackInOut
 * @static public
*/
Duedo.Easing.BackInOut = function(value) {
    
    var s = 1.70158 * 1.525;
    
    if ( ( value *= 2 ) < 1 )
    {
        return 0.5 * ( value * value * ( ( s + 1 ) * value - s ) );
    } 
    
    return 0.5 * ( ( value -= 2 ) * value * ( ( s + 1 ) * value + s ) + 2 );
};


/*
 * QuinticIn
 * @static public
*/
Duedo.Easing.QuinticIn = function(value) {
    return value * value * value * value * value;
};


/*
 * QunticOut
 * @static public
*/
Duedo.Easing.QuinticOut = function(value) {
    return --value * value * value * value * value + 1;
};


/*
 * QuinticInOut
 * @static public
*/
Duedo.Easing.QuinticInOut = function(value) {
    
    if ( ( value *= 2 ) < 1 ) 
    {
        return 0.5 * value * value * value * value * value;
    }
        
    return 0.5 * ( ( value -= 2 ) * value * value * value * value + 2 );
};


/*
 * ExponentialIn
 * @static public
*/
Duedo.Easing.ExponentialIn = function(value) {
    return value === 0 ? 0 : Math.pow( 1024, value - 1 );
};


/*
 * ExponentialOut
 * @static public
*/
Duedo.Easing.ExponentialOut = function(value) {
   return value === 1 ? 1 : 1 - Math.pow( 2, - 10 * value );
};


/*
 * ExponentialInOut
 * @static public
*/
Duedo.Easing.ExponentialInOut = function(value) {
    
    if ( value === 0 ) 
        return 0;

    if ( value === 1 ) 
        return 1;
    
    if ( ( value *= 2 ) < 1 ) 
        return 0.5 * Math.pow( 1024, value - 1 );

    return 0.5 * ( - Math.pow( 2, - 10 * ( value - 1 ) ) + 2 );
};


/*
 * BounceIn
 * @static public
*/
Duedo.Easing.BounceIn = function(value) {
    return 1 - Duedo.Easing.BounceOut( 1 - value );
};


/*
 * BounceOut
 * @static public
*/
Duedo.Easing.BounceOut = function(value) {

    if ( value < ( 1 / 2.75 ) ) 
    {
        return 7.5625 * value * value;
    } 
    else if ( value < ( 2 / 2.75 ) ) 
    {
        return 7.5625 * ( value -= ( 1.5 / 2.75 ) ) * value + 0.75;
    } 
    else if ( value < ( 2.5 / 2.75 ) ) 
    {
        return 7.5625 * ( value -= ( 2.25 / 2.75 ) ) * value + 0.9375;
    } 
    else 
    {
       return 7.5625 * ( value -= ( 2.625 / 2.75 ) ) * value + 0.984375;
    }

};


/*
 * BounceInOut
 * @static public
*/
Duedo.Easing.BounceInOut = function(value) {
    
    if ( value < 0.5 ) 
        return Duedo.Easing.BounceIn( value * 2 ) * 0.5;
    
    return Duedo.Easing.BounceOut( value * 2 - 1 ) * 0.5 + 0.5;
};

/*
Duedo.Easing.Harmonic = function (value) {
    return 1 - Math.sin(10 * value) / (10 * value);
};
*/
/*
Duedo.Easing.Bounce = function (value) {
    return ((1 - Math.cos(value * 3 * Math.PI)) * (1 - value)) + value;
};
*/
/*
==============================
Duedo.Object
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Object = function () {
    this.Id;

    /*
     Can be removed?
    */
    this.InUse = true;
    this.PendingDestroy = false;

    /*
     Parent object
    */
    this.Parent = null;

    /*
    Events
    */
    this._Triggers = {};

    /*
     * _LiveFor
     * @private
     * Use Object.LiveFor(time_ms) method
     * An object lives for a limited time (milliseconds)
    */
    this._LiveFor;

    /*
     Children
    */
    this.ChildrenList = new Duedo.ChildrenList();

    /*
    Name
    */
    this.Name = "object";

    /*
     * BornTime
     * The time when the object is inserted into the loop
    */
    this.BornTime;

    /*
     * A little useful class
    */
    this.Cache = {};

};


Duedo.Object.prototype.constructor = Duedo.Object;



/*
 * LiveFor
 * An object lives for a limited time (milliseconds) : ex myobject.LiveFor(0.5);
 * @param ms: time
 * @param ondestroy: callback on destroy
*/
Duedo.Object.prototype.LiveFor = function (ms, ondestroy) {

    this._LiveFor = parseFloat(ms);

    if (!Duedo.Utils.IsNull(ondestroy))
        this.Bind("destroy", ondestroy)
};


/*
 * MustBeDead
 * Check graphicobject lifetime
 * Check if this object is still alive or must be dead and removed
*/
Duedo.Object.prototype.MustBeDead = function (game) {

    if (Duedo.Null(this.LiveFor) || Duedo.Null(this.BornTime))
        return false;

    if (game.ElapsedTime - this.BornTime > this._LiveFor)
        return true;

    return false;
};



/*
 * Destroy
 * Object will be removed the next frame
*/
Duedo.Object.prototype.Destroy = function () {

    this.PendingDestroy = true;
    this.InUse = false;

    return this;
};



/*
 * Bind event
 * @eventName: string, name of the event
 * @callback: the callback function
*/
Duedo.Object.prototype.Bind = function (eventName, callback) {

    if ( typeof eventName !== "undefined" && typeof callback !== "undefined" )
    {
        eventName = eventName.toLowerCase();

        if ( typeof this._Triggers[eventName] === "undefined" )
        {
            this._Triggers[eventName] = new Array();
        }

        this._Triggers[eventName].push(callback);
    }

    return this;
};



/**
 * Unbind an event
 * @param {*} eventName 
 * @returns 
 */
Duedo.Object.prototype.Unbind = function (eventName) {
    if(this._Triggers.hasOwnProperty(eventName)) {
        delete this._Triggers[eventName];
    } else {
        console.warn(`Duedo.Object.Unbind: attempt to delete an unknown event "${eventName}"`);
    }
    return this;
};



/*
 * _CallTriggers
 * private
 * @eventName: string, name of the triggered event
*/
Duedo.Object.prototype._CallTriggers = function (eventName, caller) {

    eventName = eventName.toLowerCase();

    if( typeof this._Triggers[eventName] === "undefined" )
    {
        return;
    }

    for (var i in this._Triggers[eventName])
    {
        this._Triggers[eventName][i].call(Duedo.Utils.IsNull(caller) ? this : caller);
    }

    //[!] The events are retained after execution
    //Use ClearTriggers

    return this;

};



/*
 * ClearTriggers
 * Remove all the events attached to @eventName
 * @eventName: string, name of the triggered event
*/
Duedo.Object.prototype.ClearTriggers = function ( eventName ) {

    if( typeof eventName  === "undefined" || !eventName )
    {
        return this._Triggers = {};
    }
    else
    {
        if ( typeof this._Triggers[eventName] != "undefined" )
        {
            return this._Triggers[eventName] = new Array();
        }
           
    }

};









/*
==============================
Duedo.GraphicObject
Author: http://www.edoardocasella.it

Graphic objects are all that can be rendered like spritesheets, particle systems, layers, parallax, world, viewport etc...
==============================
*/

Duedo.GraphicObject = function () {
    Duedo.Object.call(this);

    /*
    Buffered graphic object resource
    */
    this.Source;

    /*
     * Name
    */
    this.Name;

    /*
    * Dimension
    * @private
    */
    this._Width;
    this._Height;

    /*
    Location in the world
    */
    this.Location;
    this.LastLocation;

    /*
    Scale vector
    */
    this.Scale;

    /*
    Opacity/Alpha
    */
    this.Alpha;


    /*
     Rotation rad
    */
    this._Rotation;

    /*
     * Anchor
     * Rotation anchor of this object
    */
    this.Anchor;

    /*
    Is renderable
    Is object visible inside the viewport?
    */
    this.Renderable;


    /*
        Z - Ordering
        Used for rendering order
    */
    this._Z = 0;
    this.RenderOrderID = 0;

    /*
       BlendMode
    */
    this.BlendMode;


    /*
        Animation manger
        Used to manage the animations on the properties of a graphic object
    */
    this.AnimationManager;
    
    
    /*
     * Physic body
    */
    this.Body;


    /*
        ViewportDependant
    */
    this.FixedToViewport = false;
    this.ViewportOffset;
   
};



/*Inherit from generic Object*/
Duedo.GraphicObject.prototype = Object.create(Duedo.Object.prototype);
Duedo.GraphicObject.prototype.constructor = Duedo.GraphicObject;



/*
 * _super
*/
Duedo.GraphicObject.prototype._super = function () { 

    this.Location           = new Duedo.Vector2(0, 0);
    this.LastLocation       = this.Location.Clone();
    this.AnimationManager   = new Duedo.AnimationManager(this.Game, this);
    this.Renderable         = true;
    this.Alpha              = 1;
    this.Rotation           = 0;
    this.Scale              = new Duedo.Vector2(1, 1);
    this._Z                 = 0;
    this.ViewportOffset     = new Duedo.Vector2(0, 0);
    this.Anchor             = new Duedo.Point(0.5, 0.5);

    return this;
};



/*
 * Translate
*/
Duedo.GraphicObject.prototype.Translate = function (tVector2) {

    if (tVector2 !== undefined || tVector2 instanceof Duedo.Vector2)
    {
        this.Location.Translate(tVector2);
    }
    else
    {
        throw "Duedo.Object.Translate: needs Duedo.Vector2";
    }

    return this;

};



/*
 * SetLocation
 * @public
 * Modify location vetor of this graphic object
*/
Duedo.GraphicObject.prototype.SetLocation = function(x, y) {
    this.Location.X = x || this.Location.X;
    this.Location.Y = y || this.Location.Y;
    return this;
};


/*
 * Attach
 * Attach a children to this GraphicObject
 * Useful to create parents elements or groups
*/
Duedo.GraphicObject.prototype.Attach = function (gobject, name = null) {
    gobject.Offset = gobject.Location.Clone();
    gobject.ParentState = this.ParentState;
    gobject.Parent = this;
    this.ChildrenList.Add(gobject, name);
    return this;
};



/*
 * Detach
 * Detach a children graphic object
*/
Duedo.GraphicObject.prototype.Detach = function (gobject) {
    this.ChildrenList.RemoveObject(gobject);
};




/*
 * Rotate
 * @Angle: radians
*/
Duedo.GraphicObject.prototype.Rotate = function ( /*rad*/ angle) {

    this.Angle = angle;

    if (this.Angle > Math.PI * 2)
    {
        this.Angle -= Math.PI * 2;
    }

    return this;

};



/*
 * MouseHover
 * !no rotation
 * Check if mouse is over
 * DA RIMUOVERE *********************************************************
*/
Duedo.GraphicObject.prototype.MouseHover = function () {

    if( this.Renderable === false )
    {
        return false;
    }

    return this.Game.InputManager.Mouse.Intersects(this);

};


Duedo.GraphicObject.prototype.SuperPreUpdate = function (deltaT) { };


/*
 * SuperPreUpdate
 * @public
*/
Duedo.GraphicObject.prototype.SuperPreUpdate = function (deltaT) {

};


/*
 * SuperUpdate
*/
Duedo.GraphicObject.prototype.SuperUpdate = function (deltaT) {
    
};


/*
 * SuperPostUpdate
*/
Duedo.GraphicObject.prototype.SuperPostUpdate = function (deltaT) {

    if(this.FixedToViewport && this.ChildrenList.List.length) {
        this.ChildrenList.Empty();
        return console.error('Duedo.GraphicObject.SuperPostUpdate: at the moment is not recommended that a fixedToViewport object have any child elements')
    }
    
    //Update graphic children
    for (var i = this.ChildrenList.List.length - 1; i >= 0; i--) {
        var child = this.ChildrenList.List[i];

        //Update based on this parent
        child.Location.X = ((this.Location.X / (!this.FixedToViewport ? 1 : this.Game.Viewport.Zoom)) + child.Offset.X);
        child.Location.Y = ((this.Location.Y / (!this.FixedToViewport ? 1 : this.Game.Viewport.Zoom)) + child.Offset.Y);
        
        /*Important*/
        if (child.ParentState != this.ParentState)
            child.ParentState = this.ParentState;

        child.Z = this.Z + child.Z;
        child.Scale = this.Scale;
        // child.Alpha = this.Alpha;
    }

    return this;

};



/*
 * SuperDraw
*/
Duedo.GraphicObject.prototype.SuperDraw = function (context) {
    //throw 'Duedo.GraphicObject.draw not implemented';
};




/*
 * Animate
 * Animate a property or a set of properties
 * @AffectedProperties: the target property ( can be an object as: Location: {X:200, Y:20} )
 * @Duration _number: duration of this animation
 * @Tweening _string: EaseIn, EaseOut, Quadratic, etc
*/
Duedo.GraphicObject.prototype.Animate = function (AffectedProperties, Duration, Tweening, name) {
    return this.AnimationManager.Animate( AffectedProperties, Duration, Tweening, name);
};
/*
 * UpdateAnimations
 * @deltaT = deltaT main loop
*/
Duedo.GraphicObject.prototype.UpdateAnimations = function ( deltaT ) {
    return this.AnimationManager.Update( deltaT );
};

Duedo.GraphicObject.prototype.StopAnimations = function(complete) {
    return this.AnimationManager.StopAll(complete);
};

Duedo.GraphicObject.prototype.PauseAnimations = function() {
    return this.AnimationManager.PauseAll();
};

Duedo.GraphicObject.prototype.ResumeAnimations = function() {
    return this.AnimationManager.ResumeAll();
};
/*
 * Animating
 * Is object animating?
 * FIX: E SE E' IN PAUSA???
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Animating", {

    get: function () {
        return this.AnimationManager.Animations.length > 0;
    }

});



/*
 * ShouldBeRendered
 * @public
 * Check if one or more children should be rendered even if parent not
*/
Object.defineProperty(Duedo.GraphicObject.prototype, 'ShouldBeRendered', {

    get: function() {
        if(this.Renderable) {
            return true;
        }
        let forceRender = false;
        this.ChildrenList.List.forEach(element => {
            if(element.ShouldBeRendered) {
                forceRender = true;
            }
        });
        return forceRender;
    },

});



/*
 * Rotation
 * @public
 * Set the rotation angle in radians
*/
Object.defineProperty(Duedo.GraphicObject.prototype, 'Rotation', {

    get: function() {
        return this._Rotation;
    },

    set: function(value) {
        this._Rotation = /*radians*/ value;
    }

});



/*
 * Z
 * Represent the z plane of this graphic object
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Z", {
    
    get:function() {
        return this._Z;
    },

    set: function(value) {
        
        if(this._Z === value)
            return;

        this._Z = Number(value);

        /*So we need to sort planes by Z before render*/
        this.Game.Renderer.SortPlanes = true;
        
            
    }

});




/*
 * Interactive
 * Set this object as interactive, then can be dragged, clicked...
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Interactive", {

    set: function (bool) {

        if (bool === true) {
            if(!this._Interactive)
                this._Interactive = this.Game.InputManager.InteractivityManager.Add(this);
        }
        else {
            if(this._Interactive)
                this._Interactive = this.Game.InputManager.InteractivityManager.Remove(this);
        }

    },


    get: function () {
        return this._Interactive;
    }

});



/*
 * Draggable
 * @public
 * Set this sprite as draggable
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Draggable", {


    set: function (bool) {

        if (bool === true) {
            if (!this.Interactive)
                this.Interactive = true;

            this._Draggable = true;
        }
        else {
            if (this.Interactive) {
                this._Draggable = false;
                this.Interactive = false;
            }
        }

    },


    get: function () {
        return this._Draggable;
    }
});





/*
==============================
Duedo.Entity
Author: http://www.edoardocasella.it

//!! QUANDO QUESTO VIENE RIMOSSO DALL'ENGINE DEVE ESSERE RIMOSSA ANCHE LA SUA SPRITESHEET
==============================
*/


Duedo.Entity = function ( gameContext, sprite ) { 
	Duedo.GraphicObject.call(this);

	this.Game = gameContext || null;
	this._Id = Duedo.NextId();
	
	this.Sprite;

	this._init(sprite);

};


/*Inherit GraphicObject*/
Duedo.Entity.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Entity.prototype.constructor = Duedo.Entity;


/*
 * Init
 * private
*/
Duedo.Entity.prototype._init = function(sprite) {

	if(Duedo.Null(this.Game)) 
	{
		throw "Entity err: needs game context";
	}

	if(!Duedo.Null(sprite)) 
	{
		this.Sprite = sprite;
	}

	return this;
};



/*
 * Generate
 * Add this entity to the game
*/
Duedo.Entity.prototype.Generate = function() {
	
	this.Game.Add(this);

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Game.Add(this.Sprite);
	}

	return this;

};


/*
 * KillSprite
 * remove sprite and body from the game
*/
Duedo.Entity.prototype.Kill = function() {

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Sprite.InUse = false;
		
		if(this.Sprite.Body)
		{
			this.Game.PhysicsEngine.World.DestroyBody(this.Body);
		}
	}

};


/*
 * AddBody
 * add a body to the entity's sprite
*/
Duedo.Entity.prototype.AddBody = function(body) {

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Sprite.Body = body;
	}

	return this;

};


/*
 * Update
 * Must/can be overwritten
*/
Duedo.Entity.prototype.Update     = function() {};
Duedo.Entity.prototype.PreUpdate  = function() {};
Duedo.Entity.prototype.PostUpdate = function() {};

/*
 * Draw
 * Must/can be overwritten
*/
Duedo.Entity.prototype.Draw     = function() {};


/*
 * Entity ID
*/
Object.defineProperty(Duedo.Entity.prototype, "Id", {

	get: function() {
		return this._Id;
	}

});



/*
 * Entity Body
*/
Object.defineProperty(Duedo.Entity.prototype, "Body", {

	get: function() {

		if(!Duedo.Null(this.Sprite)) 
		{
			return this.Sprite.Body;
		}
		
	}

});
/*
* Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/
var Box2D = {};

(function (a2j, undefined) {

   if(!(Object.prototype.defineProperty instanceof Function)
      && Object.prototype.__defineGetter__ instanceof Function
      && Object.prototype.__defineSetter__ instanceof Function)
   {
      Object.defineProperty = function(obj, p, cfg) {
         if(cfg.get instanceof Function)
            obj.__defineGetter__(p, cfg.get);
         if(cfg.set instanceof Function)
            obj.__defineSetter__(p, cfg.set);
      }
   }
   
   function emptyFn() {};
   a2j.inherit = function(cls, base) {
      var tmpCtr = cls;
      emptyFn.prototype = base.prototype;
      cls.prototype = new emptyFn;
      cls.prototype.constructor = tmpCtr;
   };
   
   a2j.generateCallback = function generateCallback(context, cb) {
      return function () {
         cb.apply(context, arguments);
      };
   };
   
   a2j.NVector = function NVector(length) {
      if (length === undefined) length = 0;
      var tmp = new Array(length || 0);
      for (var i = 0; i < length; ++i)
      tmp[i] = 0;
      return tmp;
   };
   
   a2j.is = function is(o1, o2) {
      if (o1 === null) return false;
      if ((o2 instanceof Function) && (o1 instanceof o2)) return true;
      if ((o1.constructor.__implements != undefined) && (o1.constructor.__implements[o2])) return true;
      return false;
   };
   
   a2j.parseUInt = function(v) {
      return Math.abs(parseInt(v));
   }
   
})(Box2D);

//#TODO remove assignments from global namespace
var Vector = Array;
var Vector_a2j_Number = Box2D.NVector;
//package structure
if (typeof(Box2D) === "undefined") Box2D = {};
if (typeof(Box2D.Collision) === "undefined") Box2D.Collision = {};
if (typeof(Box2D.Collision.Shapes) === "undefined") Box2D.Collision.Shapes = {};
if (typeof(Box2D.Common) === "undefined") Box2D.Common = {};
if (typeof(Box2D.Common.Math) === "undefined") Box2D.Common.Math = {};
if (typeof(Box2D.Dynamics) === "undefined") Box2D.Dynamics = {};
if (typeof(Box2D.Dynamics.Contacts) === "undefined") Box2D.Dynamics.Contacts = {};
if (typeof(Box2D.Dynamics.Controllers) === "undefined") Box2D.Dynamics.Controllers = {};
if (typeof(Box2D.Dynamics.Joints) === "undefined") Box2D.Dynamics.Joints = {};
//pre-definitions
(function () {
   Box2D.Collision.IBroadPhase = 'Box2D.Collision.IBroadPhase';

   function b2AABB() {
      b2AABB.b2AABB.apply(this, arguments);
   };
   Box2D.Collision.b2AABB = b2AABB;

   function b2Bound() {
      b2Bound.b2Bound.apply(this, arguments);
   };
   Box2D.Collision.b2Bound = b2Bound;

   function b2BoundValues() {
      b2BoundValues.b2BoundValues.apply(this, arguments);
      if (this.constructor === b2BoundValues) this.b2BoundValues.apply(this, arguments);
   };
   Box2D.Collision.b2BoundValues = b2BoundValues;

   function b2Collision() {
      b2Collision.b2Collision.apply(this, arguments);
   };
   Box2D.Collision.b2Collision = b2Collision;

   function b2ContactID() {
      b2ContactID.b2ContactID.apply(this, arguments);
      if (this.constructor === b2ContactID) this.b2ContactID.apply(this, arguments);
   };
   Box2D.Collision.b2ContactID = b2ContactID;

   function b2ContactPoint() {
      b2ContactPoint.b2ContactPoint.apply(this, arguments);
   };
   Box2D.Collision.b2ContactPoint = b2ContactPoint;

   function b2Distance() {
      b2Distance.b2Distance.apply(this, arguments);
   };
   Box2D.Collision.b2Distance = b2Distance;

   function b2DistanceInput() {
      b2DistanceInput.b2DistanceInput.apply(this, arguments);
   };
   Box2D.Collision.b2DistanceInput = b2DistanceInput;

   function b2DistanceOutput() {
      b2DistanceOutput.b2DistanceOutput.apply(this, arguments);
   };
   Box2D.Collision.b2DistanceOutput = b2DistanceOutput;

   function b2DistanceProxy() {
      b2DistanceProxy.b2DistanceProxy.apply(this, arguments);
   };
   Box2D.Collision.b2DistanceProxy = b2DistanceProxy;

   function b2DynamicTree() {
      b2DynamicTree.b2DynamicTree.apply(this, arguments);
      if (this.constructor === b2DynamicTree) this.b2DynamicTree.apply(this, arguments);
   };
   Box2D.Collision.b2DynamicTree = b2DynamicTree;

   function b2DynamicTreeBroadPhase() {
      b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments);
   };
   Box2D.Collision.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;

   function b2DynamicTreeNode() {
      b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments);
   };
   Box2D.Collision.b2DynamicTreeNode = b2DynamicTreeNode;

   function b2DynamicTreePair() {
      b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments);
   };
   Box2D.Collision.b2DynamicTreePair = b2DynamicTreePair;

   function b2Manifold() {
      b2Manifold.b2Manifold.apply(this, arguments);
      if (this.constructor === b2Manifold) this.b2Manifold.apply(this, arguments);
   };
   Box2D.Collision.b2Manifold = b2Manifold;

   function b2ManifoldPoint() {
      b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
      if (this.constructor === b2ManifoldPoint) this.b2ManifoldPoint.apply(this, arguments);
   };
   Box2D.Collision.b2ManifoldPoint = b2ManifoldPoint;

   function b2Point() {
      b2Point.b2Point.apply(this, arguments);
   };
   Box2D.Collision.b2Point = b2Point;

   function b2RayCastInput() {
      b2RayCastInput.b2RayCastInput.apply(this, arguments);
      if (this.constructor === b2RayCastInput) this.b2RayCastInput.apply(this, arguments);
   };
   Box2D.Collision.b2RayCastInput = b2RayCastInput;

   function b2RayCastOutput() {
      b2RayCastOutput.b2RayCastOutput.apply(this, arguments);
   };
   Box2D.Collision.b2RayCastOutput = b2RayCastOutput;

   function b2Segment() {
      b2Segment.b2Segment.apply(this, arguments);
   };
   Box2D.Collision.b2Segment = b2Segment;

   function b2SeparationFunction() {
      b2SeparationFunction.b2SeparationFunction.apply(this, arguments);
   };
   Box2D.Collision.b2SeparationFunction = b2SeparationFunction;

   function b2Simplex() {
      b2Simplex.b2Simplex.apply(this, arguments);
      if (this.constructor === b2Simplex) this.b2Simplex.apply(this, arguments);
   };
   Box2D.Collision.b2Simplex = b2Simplex;

   function b2SimplexCache() {
      b2SimplexCache.b2SimplexCache.apply(this, arguments);
   };
   Box2D.Collision.b2SimplexCache = b2SimplexCache;

   function b2SimplexVertex() {
      b2SimplexVertex.b2SimplexVertex.apply(this, arguments);
   };
   Box2D.Collision.b2SimplexVertex = b2SimplexVertex;

   function b2TimeOfImpact() {
      b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments);
   };
   Box2D.Collision.b2TimeOfImpact = b2TimeOfImpact;

   function b2TOIInput() {
      b2TOIInput.b2TOIInput.apply(this, arguments);
   };
   Box2D.Collision.b2TOIInput = b2TOIInput;

   function b2WorldManifold() {
      b2WorldManifold.b2WorldManifold.apply(this, arguments);
      if (this.constructor === b2WorldManifold) this.b2WorldManifold.apply(this, arguments);
   };
   Box2D.Collision.b2WorldManifold = b2WorldManifold;

   function ClipVertex() {
      ClipVertex.ClipVertex.apply(this, arguments);
   };
   Box2D.Collision.ClipVertex = ClipVertex;

   function Features() {
      Features.Features.apply(this, arguments);
   };
   Box2D.Collision.Features = Features;

   function b2CircleShape() {
      b2CircleShape.b2CircleShape.apply(this, arguments);
      if (this.constructor === b2CircleShape) this.b2CircleShape.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2CircleShape = b2CircleShape;

   function b2EdgeChainDef() {
      b2EdgeChainDef.b2EdgeChainDef.apply(this, arguments);
      if (this.constructor === b2EdgeChainDef) this.b2EdgeChainDef.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2EdgeChainDef = b2EdgeChainDef;

   function b2EdgeShape() {
      b2EdgeShape.b2EdgeShape.apply(this, arguments);
      if (this.constructor === b2EdgeShape) this.b2EdgeShape.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2EdgeShape = b2EdgeShape;

   function b2MassData() {
      b2MassData.b2MassData.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2MassData = b2MassData;

   function b2PolygonShape() {
      b2PolygonShape.b2PolygonShape.apply(this, arguments);
      if (this.constructor === b2PolygonShape) this.b2PolygonShape.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2PolygonShape = b2PolygonShape;

   function b2Shape() {
      b2Shape.b2Shape.apply(this, arguments);
      if (this.constructor === b2Shape) this.b2Shape.apply(this, arguments);
   };
   Box2D.Collision.Shapes.b2Shape = b2Shape;
   Box2D.Common.b2internal = 'Box2D.Common.b2internal';

   function b2Color() {
      b2Color.b2Color.apply(this, arguments);
      if (this.constructor === b2Color) this.b2Color.apply(this, arguments);
   };
   Box2D.Common.b2Color = b2Color;

   function b2Settings() {
      b2Settings.b2Settings.apply(this, arguments);
   };
   Box2D.Common.b2Settings = b2Settings;

   function b2Mat22() {
      b2Mat22.b2Mat22.apply(this, arguments);
      if (this.constructor === b2Mat22) this.b2Mat22.apply(this, arguments);
   };
   Box2D.Common.Math.b2Mat22 = b2Mat22;

   function b2Mat33() {
      b2Mat33.b2Mat33.apply(this, arguments);
      if (this.constructor === b2Mat33) this.b2Mat33.apply(this, arguments);
   };
   Box2D.Common.Math.b2Mat33 = b2Mat33;

   function b2Math() {
      b2Math.b2Math.apply(this, arguments);
   };
   Box2D.Common.Math.b2Math = b2Math;

   function b2Sweep() {
      b2Sweep.b2Sweep.apply(this, arguments);
   };
   Box2D.Common.Math.b2Sweep = b2Sweep;

   function b2Transform() {
      b2Transform.b2Transform.apply(this, arguments);
      if (this.constructor === b2Transform) this.b2Transform.apply(this, arguments);
   };
   Box2D.Common.Math.b2Transform = b2Transform;

   function b2Vec2() {
      b2Vec2.b2Vec2.apply(this, arguments);
      if (this.constructor === b2Vec2) this.b2Vec2.apply(this, arguments);
   };
   Box2D.Common.Math.b2Vec2 = b2Vec2;

   function b2Vec3() {
      b2Vec3.b2Vec3.apply(this, arguments);
      if (this.constructor === b2Vec3) this.b2Vec3.apply(this, arguments);
   };
   Box2D.Common.Math.b2Vec3 = b2Vec3;

   function b2Body() {
      b2Body.b2Body.apply(this, arguments);
      if (this.constructor === b2Body) this.b2Body.apply(this, arguments);
   };
   Box2D.Dynamics.b2Body = b2Body;

   function b2BodyDef() {
      b2BodyDef.b2BodyDef.apply(this, arguments);
      if (this.constructor === b2BodyDef) this.b2BodyDef.apply(this, arguments);
   };
   Box2D.Dynamics.b2BodyDef = b2BodyDef;

   function b2ContactFilter() {
      b2ContactFilter.b2ContactFilter.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactFilter = b2ContactFilter;

   function b2ContactImpulse() {
      b2ContactImpulse.b2ContactImpulse.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactImpulse = b2ContactImpulse;

   function b2ContactListener() {
      b2ContactListener.b2ContactListener.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactListener = b2ContactListener;

   function b2ContactManager() {
      b2ContactManager.b2ContactManager.apply(this, arguments);
      if (this.constructor === b2ContactManager) this.b2ContactManager.apply(this, arguments);
   };
   Box2D.Dynamics.b2ContactManager = b2ContactManager;

   function b2DebugDraw() {
      b2DebugDraw.b2DebugDraw.apply(this, arguments);
      if (this.constructor === b2DebugDraw) this.b2DebugDraw.apply(this, arguments);
   };
   Box2D.Dynamics.b2DebugDraw = b2DebugDraw;

   function b2DestructionListener() {
      b2DestructionListener.b2DestructionListener.apply(this, arguments);
   };
   Box2D.Dynamics.b2DestructionListener = b2DestructionListener;

   function b2FilterData() {
      b2FilterData.b2FilterData.apply(this, arguments);
   };
   Box2D.Dynamics.b2FilterData = b2FilterData;

   function b2Fixture() {
      b2Fixture.b2Fixture.apply(this, arguments);
      if (this.constructor === b2Fixture) this.b2Fixture.apply(this, arguments);
   };
   Box2D.Dynamics.b2Fixture = b2Fixture;

   function b2FixtureDef() {
      b2FixtureDef.b2FixtureDef.apply(this, arguments);
      if (this.constructor === b2FixtureDef) this.b2FixtureDef.apply(this, arguments);
   };
   Box2D.Dynamics.b2FixtureDef = b2FixtureDef;

   function b2Island() {
      b2Island.b2Island.apply(this, arguments);
      if (this.constructor === b2Island) this.b2Island.apply(this, arguments);
   };
   Box2D.Dynamics.b2Island = b2Island;

   function b2TimeStep() {
      b2TimeStep.b2TimeStep.apply(this, arguments);
   };
   Box2D.Dynamics.b2TimeStep = b2TimeStep;

   function b2World() {
      b2World.b2World.apply(this, arguments);
      if (this.constructor === b2World) this.b2World.apply(this, arguments);
   };
   Box2D.Dynamics.b2World = b2World;

   function b2CircleContact() {
      b2CircleContact.b2CircleContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2CircleContact = b2CircleContact;

   function b2Contact() {
      b2Contact.b2Contact.apply(this, arguments);
      if (this.constructor === b2Contact) this.b2Contact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2Contact = b2Contact;

   function b2ContactConstraint() {
      b2ContactConstraint.b2ContactConstraint.apply(this, arguments);
      if (this.constructor === b2ContactConstraint) this.b2ContactConstraint.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactConstraint = b2ContactConstraint;

   function b2ContactConstraintPoint() {
      b2ContactConstraintPoint.b2ContactConstraintPoint.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactConstraintPoint = b2ContactConstraintPoint;

   function b2ContactEdge() {
      b2ContactEdge.b2ContactEdge.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactEdge = b2ContactEdge;

   function b2ContactFactory() {
      b2ContactFactory.b2ContactFactory.apply(this, arguments);
      if (this.constructor === b2ContactFactory) this.b2ContactFactory.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactFactory = b2ContactFactory;

   function b2ContactRegister() {
      b2ContactRegister.b2ContactRegister.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;

   function b2ContactResult() {
      b2ContactResult.b2ContactResult.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;

   function b2ContactSolver() {
      b2ContactSolver.b2ContactSolver.apply(this, arguments);
      if (this.constructor === b2ContactSolver) this.b2ContactSolver.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;

   function b2EdgeAndCircleContact() {
      b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;

   function b2NullContact() {
      b2NullContact.b2NullContact.apply(this, arguments);
      if (this.constructor === b2NullContact) this.b2NullContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;

   function b2PolyAndCircleContact() {
      b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;

   function b2PolyAndEdgeContact() {
      b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;

   function b2PolygonContact() {
      b2PolygonContact.b2PolygonContact.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;

   function b2PositionSolverManifold() {
      b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
      if (this.constructor === b2PositionSolverManifold) this.b2PositionSolverManifold.apply(this, arguments);
   };
   Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;

   function b2BuoyancyController() {
      b2BuoyancyController.b2BuoyancyController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2BuoyancyController = b2BuoyancyController;

   function b2ConstantAccelController() {
      b2ConstantAccelController.b2ConstantAccelController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ConstantAccelController = b2ConstantAccelController;

   function b2ConstantForceController() {
      b2ConstantForceController.b2ConstantForceController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ConstantForceController = b2ConstantForceController;

   function b2Controller() {
      b2Controller.b2Controller.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2Controller = b2Controller;

   function b2ControllerEdge() {
      b2ControllerEdge.b2ControllerEdge.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2ControllerEdge = b2ControllerEdge;

   function b2GravityController() {
      b2GravityController.b2GravityController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2GravityController = b2GravityController;

   function b2TensorDampingController() {
      b2TensorDampingController.b2TensorDampingController.apply(this, arguments);
   };
   Box2D.Dynamics.Controllers.b2TensorDampingController = b2TensorDampingController;

   function b2DistanceJoint() {
      b2DistanceJoint.b2DistanceJoint.apply(this, arguments);
      if (this.constructor === b2DistanceJoint) this.b2DistanceJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2DistanceJoint = b2DistanceJoint;

   function b2DistanceJointDef() {
      b2DistanceJointDef.b2DistanceJointDef.apply(this, arguments);
      if (this.constructor === b2DistanceJointDef) this.b2DistanceJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2DistanceJointDef = b2DistanceJointDef;

   function b2FrictionJoint() {
      b2FrictionJoint.b2FrictionJoint.apply(this, arguments);
      if (this.constructor === b2FrictionJoint) this.b2FrictionJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2FrictionJoint = b2FrictionJoint;

   function b2FrictionJointDef() {
      b2FrictionJointDef.b2FrictionJointDef.apply(this, arguments);
      if (this.constructor === b2FrictionJointDef) this.b2FrictionJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2FrictionJointDef = b2FrictionJointDef;

   function b2GearJoint() {
      b2GearJoint.b2GearJoint.apply(this, arguments);
      if (this.constructor === b2GearJoint) this.b2GearJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2GearJoint = b2GearJoint;

   function b2GearJointDef() {
      b2GearJointDef.b2GearJointDef.apply(this, arguments);
      if (this.constructor === b2GearJointDef) this.b2GearJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2GearJointDef = b2GearJointDef;

   function b2Jacobian() {
      b2Jacobian.b2Jacobian.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2Jacobian = b2Jacobian;

   function b2Joint() {
      b2Joint.b2Joint.apply(this, arguments);
      if (this.constructor === b2Joint) this.b2Joint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2Joint = b2Joint;

   function b2JointDef() {
      b2JointDef.b2JointDef.apply(this, arguments);
      if (this.constructor === b2JointDef) this.b2JointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2JointDef = b2JointDef;

   function b2JointEdge() {
      b2JointEdge.b2JointEdge.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2JointEdge = b2JointEdge;

   function b2LineJoint() {
      b2LineJoint.b2LineJoint.apply(this, arguments);
      if (this.constructor === b2LineJoint) this.b2LineJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2LineJoint = b2LineJoint;

   function b2LineJointDef() {
      b2LineJointDef.b2LineJointDef.apply(this, arguments);
      if (this.constructor === b2LineJointDef) this.b2LineJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2LineJointDef = b2LineJointDef;

   function b2MouseJoint() {
      b2MouseJoint.b2MouseJoint.apply(this, arguments);
      if (this.constructor === b2MouseJoint) this.b2MouseJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2MouseJoint = b2MouseJoint;

   function b2MouseJointDef() {
      b2MouseJointDef.b2MouseJointDef.apply(this, arguments);
      if (this.constructor === b2MouseJointDef) this.b2MouseJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2MouseJointDef = b2MouseJointDef;

   function b2PrismaticJoint() {
      b2PrismaticJoint.b2PrismaticJoint.apply(this, arguments);
      if (this.constructor === b2PrismaticJoint) this.b2PrismaticJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PrismaticJoint = b2PrismaticJoint;

   function b2PrismaticJointDef() {
      b2PrismaticJointDef.b2PrismaticJointDef.apply(this, arguments);
      if (this.constructor === b2PrismaticJointDef) this.b2PrismaticJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PrismaticJointDef = b2PrismaticJointDef;

   function b2PulleyJoint() {
      b2PulleyJoint.b2PulleyJoint.apply(this, arguments);
      if (this.constructor === b2PulleyJoint) this.b2PulleyJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PulleyJoint = b2PulleyJoint;

   function b2PulleyJointDef() {
      b2PulleyJointDef.b2PulleyJointDef.apply(this, arguments);
      if (this.constructor === b2PulleyJointDef) this.b2PulleyJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2PulleyJointDef = b2PulleyJointDef;

   function b2RevoluteJoint() {
      b2RevoluteJoint.b2RevoluteJoint.apply(this, arguments);
      if (this.constructor === b2RevoluteJoint) this.b2RevoluteJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2RevoluteJoint = b2RevoluteJoint;

   function b2RevoluteJointDef() {
      b2RevoluteJointDef.b2RevoluteJointDef.apply(this, arguments);
      if (this.constructor === b2RevoluteJointDef) this.b2RevoluteJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2RevoluteJointDef = b2RevoluteJointDef;

   function b2WeldJoint() {
      b2WeldJoint.b2WeldJoint.apply(this, arguments);
      if (this.constructor === b2WeldJoint) this.b2WeldJoint.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2WeldJoint = b2WeldJoint;

   function b2WeldJointDef() {
      b2WeldJointDef.b2WeldJointDef.apply(this, arguments);
      if (this.constructor === b2WeldJointDef) this.b2WeldJointDef.apply(this, arguments);
   };
   Box2D.Dynamics.Joints.b2WeldJointDef = b2WeldJointDef;
})(); //definitions
Box2D.postDefs = [];
(function () {
   var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2AABB = Box2D.Collision.b2AABB,
      b2Bound = Box2D.Collision.b2Bound,
      b2BoundValues = Box2D.Collision.b2BoundValues,
      b2Collision = Box2D.Collision.b2Collision,
      b2ContactID = Box2D.Collision.b2ContactID,
      b2ContactPoint = Box2D.Collision.b2ContactPoint,
      b2Distance = Box2D.Collision.b2Distance,
      b2DistanceInput = Box2D.Collision.b2DistanceInput,
      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
      b2DynamicTree = Box2D.Collision.b2DynamicTree,
      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
      b2Manifold = Box2D.Collision.b2Manifold,
      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
      b2Point = Box2D.Collision.b2Point,
      b2RayCastInput = Box2D.Collision.b2RayCastInput,
      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
      b2Segment = Box2D.Collision.b2Segment,
      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
      b2Simplex = Box2D.Collision.b2Simplex,
      b2SimplexCache = Box2D.Collision.b2SimplexCache,
      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
      b2TOIInput = Box2D.Collision.b2TOIInput,
      b2WorldManifold = Box2D.Collision.b2WorldManifold,
      ClipVertex = Box2D.Collision.ClipVertex,
      Features = Box2D.Collision.Features,
      IBroadPhase = Box2D.Collision.IBroadPhase;

   b2AABB.b2AABB = function () {
      this.lowerBound = new b2Vec2();
      this.upperBound = new b2Vec2();
   };
   b2AABB.prototype.IsValid = function () {
      var dX = this.upperBound.x - this.lowerBound.x;
      var dY = this.upperBound.y - this.lowerBound.y;
      var valid = dX >= 0.0 && dY >= 0.0;
      valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
      return valid;
   }
   b2AABB.prototype.GetCenter = function () {
      return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
   }
   b2AABB.prototype.GetExtents = function () {
      return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
   }
   b2AABB.prototype.Contains = function (aabb) {
      var result = true;
      result = result && this.lowerBound.x <= aabb.lowerBound.x;
      result = result && this.lowerBound.y <= aabb.lowerBound.y;
      result = result && aabb.upperBound.x <= this.upperBound.x;
      result = result && aabb.upperBound.y <= this.upperBound.y;
      return result;
   }
   b2AABB.prototype.RayCast = function (output, input) {
      var tmin = (-Number.MAX_VALUE);
      var tmax = Number.MAX_VALUE;
      var pX = input.p1.x;
      var pY = input.p1.y;
      var dX = input.p2.x - input.p1.x;
      var dY = input.p2.y - input.p1.y;
      var absDX = Math.abs(dX);
      var absDY = Math.abs(dY);
      var normal = output.normal;
      var inv_d = 0;
      var t1 = 0;
      var t2 = 0;
      var t3 = 0;
      var s = 0; {
         if (absDX < Number.MIN_VALUE) {
            if (pX < this.lowerBound.x || this.upperBound.x < pX) return false;
         }
         else {
            inv_d = 1.0 / dX;
            t1 = (this.lowerBound.x - pX) * inv_d;
            t2 = (this.upperBound.x - pX) * inv_d;
            s = (-1.0);
            if (t1 > t2) {
               t3 = t1;
               t1 = t2;
               t2 = t3;
               s = 1.0;
            }
            if (t1 > tmin) {
               normal.x = s;
               normal.y = 0;
               tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false;
         }
      } {
         if (absDY < Number.MIN_VALUE) {
            if (pY < this.lowerBound.y || this.upperBound.y < pY) return false;
         }
         else {
            inv_d = 1.0 / dY;
            t1 = (this.lowerBound.y - pY) * inv_d;
            t2 = (this.upperBound.y - pY) * inv_d;
            s = (-1.0);
            if (t1 > t2) {
               t3 = t1;
               t1 = t2;
               t2 = t3;
               s = 1.0;
            }
            if (t1 > tmin) {
               normal.y = s;
               normal.x = 0;
               tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false;
         }
      }
      output.fraction = tmin;
      return true;
   }
   b2AABB.prototype.TestOverlap = function (other) {
      var d1X = other.lowerBound.x - this.upperBound.x;
      var d1Y = other.lowerBound.y - this.upperBound.y;
      var d2X = this.lowerBound.x - other.upperBound.x;
      var d2Y = this.lowerBound.y - other.upperBound.y;
      if (d1X > 0.0 || d1Y > 0.0) return false;
      if (d2X > 0.0 || d2Y > 0.0) return false;
      return true;
   }
   b2AABB.Combine = function (aabb1, aabb2) {
      var aabb = new b2AABB();
      aabb.Combine(aabb1, aabb2);
      return aabb;
   }
   b2AABB.prototype.Combine = function (aabb1, aabb2) {
      this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
      this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
      this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
      this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y);
   }
   b2Bound.b2Bound = function () {};
   b2Bound.prototype.IsLower = function () {
      return (this.value & 1) == 0;
   }
   b2Bound.prototype.IsUpper = function () {
      return (this.value & 1) == 1;
   }
   b2Bound.prototype.Swap = function (b) {
      var tempValue = this.value;
      var tempProxy = this.proxy;
      var tempStabbingCount = this.stabbingCount;
      this.value = b.value;
      this.proxy = b.proxy;
      this.stabbingCount = b.stabbingCount;
      b.value = tempValue;
      b.proxy = tempProxy;
      b.stabbingCount = tempStabbingCount;
   }
   b2BoundValues.b2BoundValues = function () {};
   b2BoundValues.prototype.b2BoundValues = function () {
      this.lowerValues = new Vector_a2j_Number();
      this.lowerValues[0] = 0.0;
      this.lowerValues[1] = 0.0;
      this.upperValues = new Vector_a2j_Number();
      this.upperValues[0] = 0.0;
      this.upperValues[1] = 0.0;
   }
   b2Collision.b2Collision = function () {};
   b2Collision.ClipSegmentToLine = function (vOut, vIn, normal, offset) {
      if (offset === undefined) offset = 0;
      var cv;
      var numOut = 0;
      cv = vIn[0];
      var vIn0 = cv.v;
      cv = vIn[1];
      var vIn1 = cv.v;
      var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
      var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
      if (distance0 <= 0.0) vOut[numOut++].Set(vIn[0]);
      if (distance1 <= 0.0) vOut[numOut++].Set(vIn[1]);
      if (distance0 * distance1 < 0.0) {
         var interp = distance0 / (distance0 - distance1);
         cv = vOut[numOut];
         var tVec = cv.v;
         tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
         tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
         cv = vOut[numOut];
         var cv2;
         if (distance0 > 0.0) {
            cv2 = vIn[0];
            cv.id = cv2.id;
         }
         else {
            cv2 = vIn[1];
            cv.id = cv2.id;
         }++numOut;
      }
      return numOut;
   }
   b2Collision.EdgeSeparation = function (poly1, xf1, edge1, poly2, xf2) {
      if (edge1 === undefined) edge1 = 0;
      var count1 = parseInt(poly1.m_vertexCount);
      var vertices1 = poly1.m_vertices;
      var normals1 = poly1.m_normals;
      var count2 = parseInt(poly2.m_vertexCount);
      var vertices2 = poly2.m_vertices;
      var tMat;
      var tVec;
      tMat = xf1.R;
      tVec = normals1[edge1];
      var normal1WorldX = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var normal1WorldY = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      var normal1X = (tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY);
      var normal1Y = (tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY);
      var index = 0;
      var minDot = Number.MAX_VALUE;
      for (var i = 0; i < count2; ++i) {
         tVec = vertices2[i];
         var dot = tVec.x * normal1X + tVec.y * normal1Y;
         if (dot < minDot) {
            minDot = dot;
            index = i;
         }
      }
      tVec = vertices1[edge1];
      tMat = xf1.R;
      var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tVec = vertices2[index];
      tMat = xf2.R;
      var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      v2X -= v1X;
      v2Y -= v1Y;
      var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
      return separation;
   }
   b2Collision.FindMaxSeparation = function (edgeIndex, poly1, xf1, poly2, xf2) {
      var count1 = parseInt(poly1.m_vertexCount);
      var normals1 = poly1.m_normals;
      var tVec;
      var tMat;
      tMat = xf2.R;
      tVec = poly2.m_centroid;
      var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf1.R;
      tVec = poly1.m_centroid;
      dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var dLocal1X = (dX * xf1.R.col1.x + dY * xf1.R.col1.y);
      var dLocal1Y = (dX * xf1.R.col2.x + dY * xf1.R.col2.y);
      var edge = 0;
      var maxDot = (-Number.MAX_VALUE);
      for (var i = 0; i < count1; ++i) {
         tVec = normals1[i];
         var dot = (tVec.x * dLocal1X + tVec.y * dLocal1Y);
         if (dot > maxDot) {
            maxDot = dot;
            edge = i;
         }
      }
      var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
      var prevEdge = parseInt(edge - 1 >= 0 ? edge - 1 : count1 - 1);
      var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
      var nextEdge = parseInt(edge + 1 < count1 ? edge + 1 : 0);
      var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
      var bestEdge = 0;
      var bestSeparation = 0;
      var increment = 0;
      if (sPrev > s && sPrev > sNext) {
         increment = (-1);
         bestEdge = prevEdge;
         bestSeparation = sPrev;
      }
      else if (sNext > s) {
         increment = 1;
         bestEdge = nextEdge;
         bestSeparation = sNext;
      }
      else {
         edgeIndex[0] = edge;
         return s;
      }
      while (true) {
         if (increment == (-1)) edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1;
         else edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0;s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
         if (s > bestSeparation) {
            bestEdge = edge;
            bestSeparation = s;
         }
         else {
            break;
         }
      }
      edgeIndex[0] = bestEdge;
      return bestSeparation;
   }
   b2Collision.FindIncidentEdge = function (c, poly1, xf1, edge1, poly2, xf2) {
      if (edge1 === undefined) edge1 = 0;
      var count1 = parseInt(poly1.m_vertexCount);
      var normals1 = poly1.m_normals;
      var count2 = parseInt(poly2.m_vertexCount);
      var vertices2 = poly2.m_vertices;
      var normals2 = poly2.m_normals;
      var tMat;
      var tVec;
      tMat = xf1.R;
      tVec = normals1[edge1];
      var normal1X = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var normal1Y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      var tX = (tMat.col1.x * normal1X + tMat.col1.y * normal1Y);
      normal1Y = (tMat.col2.x * normal1X + tMat.col2.y * normal1Y);
      normal1X = tX;
      var index = 0;
      var minDot = Number.MAX_VALUE;
      for (var i = 0; i < count2; ++i) {
         tVec = normals2[i];
         var dot = (normal1X * tVec.x + normal1Y * tVec.y);
         if (dot < minDot) {
            minDot = dot;
            index = i;
         }
      }
      var tClip;
      var i1 = parseInt(index);
      var i2 = parseInt(i1 + 1 < count2 ? i1 + 1 : 0);
      tClip = c[0];
      tVec = vertices2[i1];
      tMat = xf2.R;
      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tClip.id.features.referenceEdge = edge1;
      tClip.id.features.incidentEdge = i1;
      tClip.id.features.incidentVertex = 0;
      tClip = c[1];
      tVec = vertices2[i2];
      tMat = xf2.R;
      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tClip.id.features.referenceEdge = edge1;
      tClip.id.features.incidentEdge = i2;
      tClip.id.features.incidentVertex = 1;
   }
   b2Collision.MakeClipPointVector = function () {
      var r = new Vector(2);
      r[0] = new ClipVertex();
      r[1] = new ClipVertex();
      return r;
   }
   b2Collision.CollidePolygons = function (manifold, polyA, xfA, polyB, xfB) {
      var cv;
      manifold.m_pointCount = 0;
      var totalRadius = polyA.m_radius + polyB.m_radius;
      var edgeA = 0;
      b2Collision.s_edgeAO[0] = edgeA;
      var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
      edgeA = b2Collision.s_edgeAO[0];
      if (separationA > totalRadius) return;
      var edgeB = 0;
      b2Collision.s_edgeBO[0] = edgeB;
      var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
      edgeB = b2Collision.s_edgeBO[0];
      if (separationB > totalRadius) return;
      var poly1;
      var poly2;
      var xf1;
      var xf2;
      var edge1 = 0;
      var flip = 0;
      var k_relativeTol = 0.98;
      var k_absoluteTol = 0.001;
      var tMat;
      if (separationB > k_relativeTol * separationA + k_absoluteTol) {
         poly1 = polyB;
         poly2 = polyA;
         xf1 = xfB;
         xf2 = xfA;
         edge1 = edgeB;
         manifold.m_type = b2Manifold.e_faceB;
         flip = 1;
      }
      else {
         poly1 = polyA;
         poly2 = polyB;
         xf1 = xfA;
         xf2 = xfB;
         edge1 = edgeA;
         manifold.m_type = b2Manifold.e_faceA;
         flip = 0;
      }
      var incidentEdge = b2Collision.s_incidentEdge;
      b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
      var count1 = parseInt(poly1.m_vertexCount);
      var vertices1 = poly1.m_vertices;
      var local_v11 = vertices1[edge1];
      var local_v12;
      if (edge1 + 1 < count1) {
         local_v12 = vertices1[parseInt(edge1 + 1)];
      }
      else {
         local_v12 = vertices1[0];
      }
      var localTangent = b2Collision.s_localTangent;
      localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
      localTangent.Normalize();
      var localNormal = b2Collision.s_localNormal;
      localNormal.x = localTangent.y;
      localNormal.y = (-localTangent.x);
      var planePoint = b2Collision.s_planePoint;
      planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
      var tangent = b2Collision.s_tangent;
      tMat = xf1.R;
      tangent.x = (tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y);
      tangent.y = (tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y);
      var tangent2 = b2Collision.s_tangent2;
      tangent2.x = (-tangent.x);
      tangent2.y = (-tangent.y);
      var normal = b2Collision.s_normal;
      normal.x = tangent.y;
      normal.y = (-tangent.x);
      var v11 = b2Collision.s_v11;
      var v12 = b2Collision.s_v12;
      v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
      v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
      v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
      v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
      var frontOffset = normal.x * v11.x + normal.y * v11.y;
      var sideOffset1 = (-tangent.x * v11.x) - tangent.y * v11.y + totalRadius;
      var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
      var clipPoints1 = b2Collision.s_clipPoints1;
      var clipPoints2 = b2Collision.s_clipPoints2;
      var np = 0;
      np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
      if (np < 2) return;
      np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
      if (np < 2) return;
      manifold.m_localPlaneNormal.SetV(localNormal);
      manifold.m_localPoint.SetV(planePoint);
      var pointCount = 0;
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; ++i) {
         cv = clipPoints2[i];
         var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
         if (separation <= totalRadius) {
            var cp = manifold.m_points[pointCount];
            tMat = xf2.R;
            var tX = cv.v.x - xf2.position.x;
            var tY = cv.v.y - xf2.position.y;
            cp.m_localPoint.x = (tX * tMat.col1.x + tY * tMat.col1.y);
            cp.m_localPoint.y = (tX * tMat.col2.x + tY * tMat.col2.y);
            cp.m_id.Set(cv.id);
            cp.m_id.features.flip = flip;
            ++pointCount;
         }
      }
      manifold.m_pointCount = pointCount;
   }
   b2Collision.CollideCircles = function (manifold, circle1, xf1, circle2, xf2) {
      manifold.m_pointCount = 0;
      var tMat;
      var tVec;
      tMat = xf1.R;
      tVec = circle1.m_p;
      var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      tVec = circle2.m_p;
      var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var distSqr = dX * dX + dY * dY;
      var radius = circle1.m_radius + circle2.m_radius;
      if (distSqr > radius * radius) {
         return;
      }
      manifold.m_type = b2Manifold.e_circles;
      manifold.m_localPoint.SetV(circle1.m_p);
      manifold.m_localPlaneNormal.SetZero();
      manifold.m_pointCount = 1;
      manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
      manifold.m_points[0].m_id.key = 0;
   }
   b2Collision.CollidePolygonAndCircle = function (manifold, polygon, xf1, circle, xf2) {
      manifold.m_pointCount = 0;
      var tPoint;
      var dX = 0;
      var dY = 0;
      var positionX = 0;
      var positionY = 0;
      var tVec;
      var tMat;
      tMat = xf2.R;
      tVec = circle.m_p;
      var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      dX = cX - xf1.position.x;
      dY = cY - xf1.position.y;
      tMat = xf1.R;
      var cLocalX = (dX * tMat.col1.x + dY * tMat.col1.y);
      var cLocalY = (dX * tMat.col2.x + dY * tMat.col2.y);
      var dist = 0;
      var normalIndex = 0;
      var separation = (-Number.MAX_VALUE);
      var radius = polygon.m_radius + circle.m_radius;
      var vertexCount = parseInt(polygon.m_vertexCount);
      var vertices = polygon.m_vertices;
      var normals = polygon.m_normals;
      for (var i = 0; i < vertexCount; ++i) {
         tVec = vertices[i];
         dX = cLocalX - tVec.x;
         dY = cLocalY - tVec.y;
         tVec = normals[i];
         var s = tVec.x * dX + tVec.y * dY;
         if (s > radius) {
            return;
         }
         if (s > separation) {
            separation = s;
            normalIndex = i;
         }
      }
      var vertIndex1 = parseInt(normalIndex);
      var vertIndex2 = parseInt(vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0);
      var v1 = vertices[vertIndex1];
      var v2 = vertices[vertIndex2];
      if (separation < Number.MIN_VALUE) {
         manifold.m_pointCount = 1;
         manifold.m_type = b2Manifold.e_faceA;
         manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
         manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
         manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
         manifold.m_points[0].m_id.key = 0;
         return;
      }
      var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
      var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
      if (u1 <= 0.0) {
         if ((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
         manifold.m_pointCount = 1;
         manifold.m_type = b2Manifold.e_faceA;
         manifold.m_localPlaneNormal.x = cLocalX - v1.x;
         manifold.m_localPlaneNormal.y = cLocalY - v1.y;
         manifold.m_localPlaneNormal.Normalize();
         manifold.m_localPoint.SetV(v1);
         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
         manifold.m_points[0].m_id.key = 0;
      }
      else if (u2 <= 0) {
         if ((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
         manifold.m_pointCount = 1;
         manifold.m_type = b2Manifold.e_faceA;
         manifold.m_localPlaneNormal.x = cLocalX - v2.x;
         manifold.m_localPlaneNormal.y = cLocalY - v2.y;
         manifold.m_localPlaneNormal.Normalize();
         manifold.m_localPoint.SetV(v2);
         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
         manifold.m_points[0].m_id.key = 0;
      }
      else {
         var faceCenterX = 0.5 * (v1.x + v2.x);
         var faceCenterY = 0.5 * (v1.y + v2.y);
         separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
         if (separation > radius) return;
         manifold.m_pointCount = 1;
         manifold.m_type = b2Manifold.e_faceA;
         manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
         manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
         manifold.m_localPlaneNormal.Normalize();
         manifold.m_localPoint.Set(faceCenterX, faceCenterY);
         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
         manifold.m_points[0].m_id.key = 0;
      }
   }
   b2Collision.TestOverlap = function (a, b) {
      var t1 = b.lowerBound;
      var t2 = a.upperBound;
      var d1X = t1.x - t2.x;
      var d1Y = t1.y - t2.y;
      t1 = a.lowerBound;
      t2 = b.upperBound;
      var d2X = t1.x - t2.x;
      var d2Y = t1.y - t2.y;
      if (d1X > 0.0 || d1Y > 0.0) return false;
      if (d2X > 0.0 || d2Y > 0.0) return false;
      return true;
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
      Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
      Box2D.Collision.b2Collision.s_localTangent = new b2Vec2();
      Box2D.Collision.b2Collision.s_localNormal = new b2Vec2();
      Box2D.Collision.b2Collision.s_planePoint = new b2Vec2();
      Box2D.Collision.b2Collision.s_normal = new b2Vec2();
      Box2D.Collision.b2Collision.s_tangent = new b2Vec2();
      Box2D.Collision.b2Collision.s_tangent2 = new b2Vec2();
      Box2D.Collision.b2Collision.s_v11 = new b2Vec2();
      Box2D.Collision.b2Collision.s_v12 = new b2Vec2();
      Box2D.Collision.b2Collision.b2CollidePolyTempVec = new b2Vec2();
      Box2D.Collision.b2Collision.b2_nullFeature = 0x000000ff;
   });
   b2ContactID.b2ContactID = function () {
      this.features = new Features();
   };
   b2ContactID.prototype.b2ContactID = function () {
      this.features._m_id = this;
   }
   b2ContactID.prototype.Set = function (id) {
      this.key = id._key;
   }
   b2ContactID.prototype.Copy = function () {
      var id = new b2ContactID();
      id.key = this.key;
      return id;
   }
   Object.defineProperty(b2ContactID.prototype, 'key', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._key;
      }
   });
   Object.defineProperty(b2ContactID.prototype, 'key', {
      enumerable: false,
      configurable: true,
      set: function (value) {
         if (value === undefined) value = 0;
         this._key = value;
         this.features._referenceEdge = this._key & 0x000000ff;
         this.features._incidentEdge = ((this._key & 0x0000ff00) >> 8) & 0x000000ff;
         this.features._incidentVertex = ((this._key & 0x00ff0000) >> 16) & 0x000000ff;
         this.features._flip = ((this._key & 0xff000000) >> 24) & 0x000000ff;
      }
   });
   b2ContactPoint.b2ContactPoint = function () {
      this.position = new b2Vec2();
      this.velocity = new b2Vec2();
      this.normal = new b2Vec2();
      this.id = new b2ContactID();
   };
   b2Distance.b2Distance = function () {};
   b2Distance.Distance = function (output, cache, input) {
      ++b2Distance.b2_gjkCalls;
      var proxyA = input.proxyA;
      var proxyB = input.proxyB;
      var transformA = input.transformA;
      var transformB = input.transformB;
      var simplex = b2Distance.s_simplex;
      simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
      var vertices = simplex.m_vertices;
      var k_maxIters = 20;
      var saveA = b2Distance.s_saveA;
      var saveB = b2Distance.s_saveB;
      var saveCount = 0;
      var closestPoint = simplex.GetClosestPoint();
      var distanceSqr1 = closestPoint.LengthSquared();
      var distanceSqr2 = distanceSqr1;
      var i = 0;
      var p;
      var iter = 0;
      while (iter < k_maxIters) {
         saveCount = simplex.m_count;
         for (i = 0;
         i < saveCount; i++) {
            saveA[i] = vertices[i].indexA;
            saveB[i] = vertices[i].indexB;
         }
         switch (simplex.m_count) {
         case 1:
            break;
         case 2:
            simplex.Solve2();
            break;
         case 3:
            simplex.Solve3();
            break;
         default:
            b2Settings.b2Assert(false);
         }
         if (simplex.m_count == 3) {
            break;
         }
         p = simplex.GetClosestPoint();
         distanceSqr2 = p.LengthSquared();
         if (distanceSqr2 > distanceSqr1) {}
         distanceSqr1 = distanceSqr2;
         var d = simplex.GetSearchDirection();
         if (d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
            break;
         }
         var vertex = vertices[simplex.m_count];
         vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
         vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
         vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
         vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
         vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
         ++iter;
         ++b2Distance.b2_gjkIters;
         var duplicate = false;
         for (i = 0;
         i < saveCount; i++) {
            if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
               duplicate = true;
               break;
            }
         }
         if (duplicate) {
            break;
         }++simplex.m_count;
      }
      b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
      simplex.GetWitnessPoints(output.pointA, output.pointB);
      output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
      output.iterations = iter;
      simplex.WriteCache(cache);
      if (input.useRadii) {
         var rA = proxyA.m_radius;
         var rB = proxyB.m_radius;
         if (output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
            output.distance -= rA + rB;
            var normal = b2Math.SubtractVV(output.pointB, output.pointA);
            normal.Normalize();
            output.pointA.x += rA * normal.x;
            output.pointA.y += rA * normal.y;
            output.pointB.x -= rB * normal.x;
            output.pointB.y -= rB * normal.y;
         }
         else {
            p = new b2Vec2();
            p.x = .5 * (output.pointA.x + output.pointB.x);
            p.y = .5 * (output.pointA.y + output.pointB.y);
            output.pointA.x = output.pointB.x = p.x;
            output.pointA.y = output.pointB.y = p.y;
            output.distance = 0.0;
         }
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.b2Distance.s_simplex = new b2Simplex();
      Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
      Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3);
   });
   b2DistanceInput.b2DistanceInput = function () {};
   b2DistanceOutput.b2DistanceOutput = function () {
      this.pointA = new b2Vec2();
      this.pointB = new b2Vec2();
   };
   b2DistanceProxy.b2DistanceProxy = function () {};
   b2DistanceProxy.prototype.Set = function (shape) {
      switch (shape.GetType()) {
      case b2Shape.e_circleShape:
         {
            var circle = (shape instanceof b2CircleShape ? shape : null);
            this.m_vertices = new Vector(1, true);
            this.m_vertices[0] = circle.m_p;
            this.m_count = 1;
            this.m_radius = circle.m_radius;
         }
         break;
      case b2Shape.e_polygonShape:
         {
            var polygon = (shape instanceof b2PolygonShape ? shape : null);
            this.m_vertices = polygon.m_vertices;
            this.m_count = polygon.m_vertexCount;
            this.m_radius = polygon.m_radius;
         }
         break;
      default:
         b2Settings.b2Assert(false);
      }
   }
   b2DistanceProxy.prototype.GetSupport = function (d) {
      var bestIndex = 0;
      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
      for (var i = 1; i < this.m_count; ++i) {
         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
         if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
         }
      }
      return bestIndex;
   }
   b2DistanceProxy.prototype.GetSupportVertex = function (d) {
      var bestIndex = 0;
      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
      for (var i = 1; i < this.m_count; ++i) {
         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
         if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
         }
      }
      return this.m_vertices[bestIndex];
   }
   b2DistanceProxy.prototype.GetVertexCount = function () {
      return this.m_count;
   }
   b2DistanceProxy.prototype.GetVertex = function (index) {
      if (index === undefined) index = 0;
      b2Settings.b2Assert(0 <= index && index < this.m_count);
      return this.m_vertices[index];
   }
   b2DynamicTree.b2DynamicTree = function () {};
   b2DynamicTree.prototype.b2DynamicTree = function () {
      this.m_root = null;
      this.m_freeList = null;
      this.m_path = 0;
      this.m_insertionCount = 0;
   }
   b2DynamicTree.prototype.CreateProxy = function (aabb, userData) {
      var node = this.AllocateNode();
      var extendX = b2Settings.b2_aabbExtension;
      var extendY = b2Settings.b2_aabbExtension;
      node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
      node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
      node.aabb.upperBound.x = aabb.upperBound.x + extendX;
      node.aabb.upperBound.y = aabb.upperBound.y + extendY;
      node.userData = userData;
      this.InsertLeaf(node);
      return node;
   }
   b2DynamicTree.prototype.DestroyProxy = function (proxy) {
      this.RemoveLeaf(proxy);
      this.FreeNode(proxy);
   }
   b2DynamicTree.prototype.MoveProxy = function (proxy, aabb, displacement) {
      b2Settings.b2Assert(proxy.IsLeaf());
      if (proxy.aabb.Contains(aabb)) {
         return false;
      }
      this.RemoveLeaf(proxy);
      var extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : (-displacement.x));
      var extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : (-displacement.y));
      proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
      proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
      proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
      proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
      this.InsertLeaf(proxy);
      return true;
   }
   b2DynamicTree.prototype.Rebalance = function (iterations) {
      if (iterations === undefined) iterations = 0;
      if (this.m_root == null) return;
      for (var i = 0; i < iterations; i++) {
         var node = this.m_root;
         var bit = 0;
         while (node.IsLeaf() == false) {
            node = (this.m_path >> bit) & 1 ? node.child2 : node.child1;
            bit = (bit + 1) & 31;
         }++this.m_path;
         this.RemoveLeaf(node);
         this.InsertLeaf(node);
      }
   }
   b2DynamicTree.prototype.GetFatAABB = function (proxy) {
      return proxy.aabb;
   }
   b2DynamicTree.prototype.GetUserData = function (proxy) {
      return proxy.userData;
   }
   b2DynamicTree.prototype.Query = function (callback, aabb) {
      if (this.m_root == null) return;
      var stack = new Vector();
      var count = 0;
      stack[count++] = this.m_root;
      while (count > 0) {
         var node = stack[--count];
         if (node.aabb.TestOverlap(aabb)) {
            if (node.IsLeaf()) {
               var proceed = callback(node);
               if (!proceed) return;
            }
            else {
               stack[count++] = node.child1;
               stack[count++] = node.child2;
            }
         }
      }
   }
   b2DynamicTree.prototype.RayCast = function (callback, input) {
      if (this.m_root == null) return;
      var p1 = input.p1;
      var p2 = input.p2;
      var r = b2Math.SubtractVV(p1, p2);
      r.Normalize();
      var v = b2Math.CrossFV(1.0, r);
      var abs_v = b2Math.AbsV(v);
      var maxFraction = input.maxFraction;
      var segmentAABB = new b2AABB();
      var tX = 0;
      var tY = 0; {
         tX = p1.x + maxFraction * (p2.x - p1.x);
         tY = p1.y + maxFraction * (p2.y - p1.y);
         segmentAABB.lowerBound.x = Math.min(p1.x, tX);
         segmentAABB.lowerBound.y = Math.min(p1.y, tY);
         segmentAABB.upperBound.x = Math.max(p1.x, tX);
         segmentAABB.upperBound.y = Math.max(p1.y, tY);
      }
      var stack = new Vector();
      var count = 0;
      stack[count++] = this.m_root;
      while (count > 0) {
         var node = stack[--count];
         if (node.aabb.TestOverlap(segmentAABB) == false) {
            continue;
         }
         var c = node.aabb.GetCenter();
         var h = node.aabb.GetExtents();
         var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
         if (separation > 0.0) continue;
         if (node.IsLeaf()) {
            var subInput = new b2RayCastInput();
            subInput.p1 = input.p1;
            subInput.p2 = input.p2;
            subInput.maxFraction = input.maxFraction;
            maxFraction = callback(subInput, node);
            if (maxFraction == 0.0) return;
            if (maxFraction > 0.0) {
               tX = p1.x + maxFraction * (p2.x - p1.x);
               tY = p1.y + maxFraction * (p2.y - p1.y);
               segmentAABB.lowerBound.x = Math.min(p1.x, tX);
               segmentAABB.lowerBound.y = Math.min(p1.y, tY);
               segmentAABB.upperBound.x = Math.max(p1.x, tX);
               segmentAABB.upperBound.y = Math.max(p1.y, tY);
            }
         }
         else {
            stack[count++] = node.child1;
            stack[count++] = node.child2;
         }
      }
   }
   b2DynamicTree.prototype.AllocateNode = function () {
      if (this.m_freeList) {
         var node = this.m_freeList;
         this.m_freeList = node.parent;
         node.parent = null;
         node.child1 = null;
         node.child2 = null;
         return node;
      }
      return new b2DynamicTreeNode();
   }
   b2DynamicTree.prototype.FreeNode = function (node) {
      node.parent = this.m_freeList;
      this.m_freeList = node;
   }
   b2DynamicTree.prototype.InsertLeaf = function (leaf) {
      ++this.m_insertionCount;
      if (this.m_root == null) {
         this.m_root = leaf;
         this.m_root.parent = null;
         return;
      }
      var center = leaf.aabb.GetCenter();
      var sibling = this.m_root;
      if (sibling.IsLeaf() == false) {
         do {
            var child1 = sibling.child1;
            var child2 = sibling.child2;
            var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
            var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
            if (norm1 < norm2) {
               sibling = child1;
            }
            else {
               sibling = child2;
            }
         }
         while (sibling.IsLeaf() == false)
      }
      var node1 = sibling.parent;
      var node2 = this.AllocateNode();
      node2.parent = node1;
      node2.userData = null;
      node2.aabb.Combine(leaf.aabb, sibling.aabb);
      if (node1) {
         if (sibling.parent.child1 == sibling) {
            node1.child1 = node2;
         }
         else {
            node1.child2 = node2;
         }
         node2.child1 = sibling;
         node2.child2 = leaf;
         sibling.parent = node2;
         leaf.parent = node2;
         do {
            if (node1.aabb.Contains(node2.aabb)) break;
            node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
            node2 = node1;
            node1 = node1.parent;
         }
         while (node1)
      }
      else {
         node2.child1 = sibling;
         node2.child2 = leaf;
         sibling.parent = node2;
         leaf.parent = node2;
         this.m_root = node2;
      }
   }
   b2DynamicTree.prototype.RemoveLeaf = function (leaf) {
      if (leaf == this.m_root) {
         this.m_root = null;
         return;
      }
      var node2 = leaf.parent;
      var node1 = node2.parent;
      var sibling;
      if (node2.child1 == leaf) {
         sibling = node2.child2;
      }
      else {
         sibling = node2.child1;
      }
      if (node1) {
         if (node1.child1 == node2) {
            node1.child1 = sibling;
         }
         else {
            node1.child2 = sibling;
         }
         sibling.parent = node1;
         this.FreeNode(node2);
         while (node1) {
            var oldAABB = node1.aabb;
            node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
            if (oldAABB.Contains(node1.aabb)) break;
            node1 = node1.parent;
         }
      }
      else {
         this.m_root = sibling;
         sibling.parent = null;
         this.FreeNode(node2);
      }
   }
   b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase = function () {
      this.m_tree = new b2DynamicTree();
      this.m_moveBuffer = new Vector();
      this.m_pairBuffer = new Vector();
      this.m_pairCount = 0;
   };
   b2DynamicTreeBroadPhase.prototype.CreateProxy = function (aabb, userData) {
      var proxy = this.m_tree.CreateProxy(aabb, userData);
      ++this.m_proxyCount;
      this.BufferMove(proxy);
      return proxy;
   }
   b2DynamicTreeBroadPhase.prototype.DestroyProxy = function (proxy) {
      this.UnBufferMove(proxy);
      --this.m_proxyCount;
      this.m_tree.DestroyProxy(proxy);
   }
   b2DynamicTreeBroadPhase.prototype.MoveProxy = function (proxy, aabb, displacement) {
      var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
      if (buffer) {
         this.BufferMove(proxy);
      }
   }
   b2DynamicTreeBroadPhase.prototype.TestOverlap = function (proxyA, proxyB) {
      var aabbA = this.m_tree.GetFatAABB(proxyA);
      var aabbB = this.m_tree.GetFatAABB(proxyB);
      return aabbA.TestOverlap(aabbB);
   }
   b2DynamicTreeBroadPhase.prototype.GetUserData = function (proxy) {
      return this.m_tree.GetUserData(proxy);
   }
   b2DynamicTreeBroadPhase.prototype.GetFatAABB = function (proxy) {
      return this.m_tree.GetFatAABB(proxy);
   }
   b2DynamicTreeBroadPhase.prototype.GetProxyCount = function () {
      return this.m_proxyCount;
   }
   b2DynamicTreeBroadPhase.prototype.UpdatePairs = function (callback) {
      var __this = this;
      __this.m_pairCount = 0;
      var i = 0,
         queryProxy;
      for (i = 0;
      i < __this.m_moveBuffer.length; ++i) {
         queryProxy = __this.m_moveBuffer[i];

         function QueryCallback(proxy) {
            if (proxy == queryProxy) return true;
            if (__this.m_pairCount == __this.m_pairBuffer.length) {
               __this.m_pairBuffer[__this.m_pairCount] = new b2DynamicTreePair();
            }
            var pair = __this.m_pairBuffer[__this.m_pairCount];
            pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
            pair.proxyB = proxy >= queryProxy ? proxy : queryProxy;++__this.m_pairCount;
            return true;
         };
         var fatAABB = __this.m_tree.GetFatAABB(queryProxy);
         __this.m_tree.Query(QueryCallback, fatAABB);
      }
      __this.m_moveBuffer.length = 0;
      for (var i = 0; i < __this.m_pairCount;) {
         var primaryPair = __this.m_pairBuffer[i];
         var userDataA = __this.m_tree.GetUserData(primaryPair.proxyA);
         var userDataB = __this.m_tree.GetUserData(primaryPair.proxyB);
         callback(userDataA, userDataB);
         ++i;
         while (i < __this.m_pairCount) {
            var pair = __this.m_pairBuffer[i];
            if (pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
               break;
            }++i;
         }
      }
   }
   b2DynamicTreeBroadPhase.prototype.Query = function (callback, aabb) {
      this.m_tree.Query(callback, aabb);
   }
   b2DynamicTreeBroadPhase.prototype.RayCast = function (callback, input) {
      this.m_tree.RayCast(callback, input);
   }
   b2DynamicTreeBroadPhase.prototype.Validate = function () {}
   b2DynamicTreeBroadPhase.prototype.Rebalance = function (iterations) {
      if (iterations === undefined) iterations = 0;
      this.m_tree.Rebalance(iterations);
   }
   b2DynamicTreeBroadPhase.prototype.BufferMove = function (proxy) {
      this.m_moveBuffer[this.m_moveBuffer.length] = proxy;
   }
   b2DynamicTreeBroadPhase.prototype.UnBufferMove = function (proxy) {
      var i = parseInt(this.m_moveBuffer.indexOf(proxy));
      this.m_moveBuffer.splice(i, 1);
   }
   b2DynamicTreeBroadPhase.prototype.ComparePairs = function (pair1, pair2) {
      return 0;
   }
   b2DynamicTreeBroadPhase.__implements = {};
   b2DynamicTreeBroadPhase.__implements[IBroadPhase] = true;
   b2DynamicTreeNode.b2DynamicTreeNode = function () {
      this.aabb = new b2AABB();
   };
   b2DynamicTreeNode.prototype.IsLeaf = function () {
      return this.child1 == null;
   }
   b2DynamicTreePair.b2DynamicTreePair = function () {};
   b2Manifold.b2Manifold = function () {
      this.m_pointCount = 0;
   };
   b2Manifold.prototype.b2Manifold = function () {
      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         this.m_points[i] = new b2ManifoldPoint();
      }
      this.m_localPlaneNormal = new b2Vec2();
      this.m_localPoint = new b2Vec2();
   }
   b2Manifold.prototype.Reset = function () {
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Reset();
      }
      this.m_localPlaneNormal.SetZero();
      this.m_localPoint.SetZero();
      this.m_type = 0;
      this.m_pointCount = 0;
   }
   b2Manifold.prototype.Set = function (m) {
      this.m_pointCount = m.m_pointCount;
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Set(m.m_points[i]);
      }
      this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
      this.m_localPoint.SetV(m.m_localPoint);
      this.m_type = m.m_type;
   }
   b2Manifold.prototype.Copy = function () {
      var copy = new b2Manifold();
      copy.Set(this);
      return copy;
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.b2Manifold.e_circles = 0x0001;
      Box2D.Collision.b2Manifold.e_faceA = 0x0002;
      Box2D.Collision.b2Manifold.e_faceB = 0x0004;
   });
   b2ManifoldPoint.b2ManifoldPoint = function () {
      this.m_localPoint = new b2Vec2();
      this.m_id = new b2ContactID();
   };
   b2ManifoldPoint.prototype.b2ManifoldPoint = function () {
      this.Reset();
   }
   b2ManifoldPoint.prototype.Reset = function () {
      this.m_localPoint.SetZero();
      this.m_normalImpulse = 0.0;
      this.m_tangentImpulse = 0.0;
      this.m_id.key = 0;
   }
   b2ManifoldPoint.prototype.Set = function (m) {
      this.m_localPoint.SetV(m.m_localPoint);
      this.m_normalImpulse = m.m_normalImpulse;
      this.m_tangentImpulse = m.m_tangentImpulse;
      this.m_id.Set(m.m_id);
   }
   b2Point.b2Point = function () {
      this.p = new b2Vec2();
   };
   b2Point.prototype.Support = function (xf, vX, vY) {
      if (vX === undefined) vX = 0;
      if (vY === undefined) vY = 0;
      return this.p;
   }
   b2Point.prototype.GetFirstVertex = function (xf) {
      return this.p;
   }
   b2RayCastInput.b2RayCastInput = function () {
      this.p1 = new b2Vec2();
      this.p2 = new b2Vec2();
   };
   b2RayCastInput.prototype.b2RayCastInput = function (p1, p2, maxFraction) {
      if (p1 === undefined) p1 = null;
      if (p2 === undefined) p2 = null;
      if (maxFraction === undefined) maxFraction = 1;
      if (p1) this.p1.SetV(p1);
      if (p2) this.p2.SetV(p2);
      this.maxFraction = maxFraction;
   }
   b2RayCastOutput.b2RayCastOutput = function () {
      this.normal = new b2Vec2();
   };
   b2Segment.b2Segment = function () {
      this.p1 = new b2Vec2();
      this.p2 = new b2Vec2();
   };
   b2Segment.prototype.TestSegment = function (lambda, normal, segment, maxLambda) {
      if (maxLambda === undefined) maxLambda = 0;
      var s = segment.p1;
      var rX = segment.p2.x - s.x;
      var rY = segment.p2.y - s.y;
      var dX = this.p2.x - this.p1.x;
      var dY = this.p2.y - this.p1.y;
      var nX = dY;
      var nY = (-dX);
      var k_slop = 100.0 * Number.MIN_VALUE;
      var denom = (-(rX * nX + rY * nY));
      if (denom > k_slop) {
         var bX = s.x - this.p1.x;
         var bY = s.y - this.p1.y;
         var a = (bX * nX + bY * nY);
         if (0.0 <= a && a <= maxLambda * denom) {
            var mu2 = (-rX * bY) + rY * bX;
            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
               a /= denom;
               var nLen = Math.sqrt(nX * nX + nY * nY);
               nX /= nLen;
               nY /= nLen;
               lambda[0] = a;
               normal.Set(nX, nY);
               return true;
            }
         }
      }
      return false;
   }
   b2Segment.prototype.Extend = function (aabb) {
      this.ExtendForward(aabb);
      this.ExtendBackward(aabb);
   }
   b2Segment.prototype.ExtendForward = function (aabb) {
      var dX = this.p2.x - this.p1.x;
      var dY = this.p2.y - this.p1.y;
      var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY,
      dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
      this.p2.x = this.p1.x + dX * lambda;
      this.p2.y = this.p1.y + dY * lambda;
   }
   b2Segment.prototype.ExtendBackward = function (aabb) {
      var dX = (-this.p2.x) + this.p1.x;
      var dY = (-this.p2.y) + this.p1.y;
      var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY,
      dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
      this.p1.x = this.p2.x + dX * lambda;
      this.p1.y = this.p2.y + dY * lambda;
   }
   b2SeparationFunction.b2SeparationFunction = function () {
      this.m_localPoint = new b2Vec2();
      this.m_axis = new b2Vec2();
   };
   b2SeparationFunction.prototype.Initialize = function (cache, proxyA, transformA, proxyB, transformB) {
      this.m_proxyA = proxyA;
      this.m_proxyB = proxyB;
      var count = parseInt(cache.count);
      b2Settings.b2Assert(0 < count && count < 3);
      var localPointA;
      var localPointA1;
      var localPointA2;
      var localPointB;
      var localPointB1;
      var localPointB2;
      var pointAX = 0;
      var pointAY = 0;
      var pointBX = 0;
      var pointBY = 0;
      var normalX = 0;
      var normalY = 0;
      var tMat;
      var tVec;
      var s = 0;
      var sgn = 0;
      if (count == 1) {
         this.m_type = b2SeparationFunction.e_points;
         localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
         localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
         tVec = localPointA;
         tMat = transformA.R;
         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         tVec = localPointB;
         tMat = transformB.R;
         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         this.m_axis.x = pointBX - pointAX;
         this.m_axis.y = pointBY - pointAY;
         this.m_axis.Normalize();
      }
      else if (cache.indexB[0] == cache.indexB[1]) {
         this.m_type = b2SeparationFunction.e_faceA;
         localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
         localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
         localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
         this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
         this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
         this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
         this.m_axis.Normalize();
         tVec = this.m_axis;
         tMat = transformA.R;
         normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tVec = this.m_localPoint;
         tMat = transformA.R;
         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         tVec = localPointB;
         tMat = transformB.R;
         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
         if (s < 0.0) {
            this.m_axis.NegativeSelf();
         }
      }
      else if (cache.indexA[0] == cache.indexA[0]) {
         this.m_type = b2SeparationFunction.e_faceB;
         localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
         localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
         localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
         this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
         this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
         this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
         this.m_axis.Normalize();
         tVec = this.m_axis;
         tMat = transformB.R;
         normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tVec = this.m_localPoint;
         tMat = transformB.R;
         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         tVec = localPointA;
         tMat = transformA.R;
         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
         if (s < 0.0) {
            this.m_axis.NegativeSelf();
         }
      }
      else {
         localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
         localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
         localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
         localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
         var pA = b2Math.MulX(transformA, localPointA);
         var dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
         var pB = b2Math.MulX(transformB, localPointB);
         var dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
         var a = dA.x * dA.x + dA.y * dA.y;
         var e = dB.x * dB.x + dB.y * dB.y;
         var r = b2Math.SubtractVV(dB, dA);
         var c = dA.x * r.x + dA.y * r.y;
         var f = dB.x * r.x + dB.y * r.y;
         var b = dA.x * dB.x + dA.y * dB.y;
         var denom = a * e - b * b;
         s = 0.0;
         if (denom != 0.0) {
            s = b2Math.Clamp((b * f - c * e) / denom, 0.0, 1.0);
         }
         var t = (b * s + f) / e;
         if (t < 0.0) {
            t = 0.0;
            s = b2Math.Clamp((b - c) / a, 0.0, 1.0);
         }
         localPointA = new b2Vec2();
         localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
         localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
         localPointB = new b2Vec2();
         localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
         localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
         if (s == 0.0 || s == 1.0) {
            this.m_type = b2SeparationFunction.e_faceB;
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
            this.m_axis.Normalize();
            this.m_localPoint = localPointB;
            tVec = this.m_axis;
            tMat = transformB.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointA;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
            if (s < 0.0) {
               this.m_axis.NegativeSelf();
            }
         }
         else {
            this.m_type = b2SeparationFunction.e_faceA;
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
            this.m_localPoint = localPointA;
            tVec = this.m_axis;
            tMat = transformA.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointB;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
            if (s < 0.0) {
               this.m_axis.NegativeSelf();
            }
         }
      }
   }
   b2SeparationFunction.prototype.Evaluate = function (transformA, transformB) {
      var axisA;
      var axisB;
      var localPointA;
      var localPointB;
      var pointA;
      var pointB;
      var seperation = 0;
      var normal;
      switch (this.m_type) {
      case b2SeparationFunction.e_points:
         {
            axisA = b2Math.MulTMV(transformA.R, this.m_axis);
            axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
            localPointA = this.m_proxyA.GetSupportVertex(axisA);
            localPointB = this.m_proxyB.GetSupportVertex(axisB);
            pointA = b2Math.MulX(transformA, localPointA);
            pointB = b2Math.MulX(transformB, localPointB);
            seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
            return seperation;
         }
      case b2SeparationFunction.e_faceA:
         {
            normal = b2Math.MulMV(transformA.R, this.m_axis);
            pointA = b2Math.MulX(transformA, this.m_localPoint);
            axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
            localPointB = this.m_proxyB.GetSupportVertex(axisB);
            pointB = b2Math.MulX(transformB, localPointB);
            seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
            return seperation;
         }
      case b2SeparationFunction.e_faceB:
         {
            normal = b2Math.MulMV(transformB.R, this.m_axis);
            pointB = b2Math.MulX(transformB, this.m_localPoint);
            axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
            localPointA = this.m_proxyA.GetSupportVertex(axisA);
            pointA = b2Math.MulX(transformA, localPointA);
            seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
            return seperation;
         }
      default:
         b2Settings.b2Assert(false);
         return 0.0;
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.b2SeparationFunction.e_points = 0x01;
      Box2D.Collision.b2SeparationFunction.e_faceA = 0x02;
      Box2D.Collision.b2SeparationFunction.e_faceB = 0x04;
   });
   b2Simplex.b2Simplex = function () {
      this.m_v1 = new b2SimplexVertex();
      this.m_v2 = new b2SimplexVertex();
      this.m_v3 = new b2SimplexVertex();
      this.m_vertices = new Vector(3);
   };
   b2Simplex.prototype.b2Simplex = function () {
      this.m_vertices[0] = this.m_v1;
      this.m_vertices[1] = this.m_v2;
      this.m_vertices[2] = this.m_v3;
   }
   b2Simplex.prototype.ReadCache = function (cache, proxyA, transformA, proxyB, transformB) {
      b2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
      var wALocal;
      var wBLocal;
      this.m_count = cache.count;
      var vertices = this.m_vertices;
      for (var i = 0; i < this.m_count; i++) {
         var v = vertices[i];
         v.indexA = cache.indexA[i];
         v.indexB = cache.indexB[i];
         wALocal = proxyA.GetVertex(v.indexA);
         wBLocal = proxyB.GetVertex(v.indexB);
         v.wA = b2Math.MulX(transformA, wALocal);
         v.wB = b2Math.MulX(transformB, wBLocal);
         v.w = b2Math.SubtractVV(v.wB, v.wA);
         v.a = 0;
      }
      if (this.m_count > 1) {
         var metric1 = cache.metric;
         var metric2 = this.GetMetric();
         if (metric2 < .5 * metric1 || 2.0 * metric1 < metric2 || metric2 < Number.MIN_VALUE) {
            this.m_count = 0;
         }
      }
      if (this.m_count == 0) {
         v = vertices[0];
         v.indexA = 0;
         v.indexB = 0;
         wALocal = proxyA.GetVertex(0);
         wBLocal = proxyB.GetVertex(0);
         v.wA = b2Math.MulX(transformA, wALocal);
         v.wB = b2Math.MulX(transformB, wBLocal);
         v.w = b2Math.SubtractVV(v.wB, v.wA);
         this.m_count = 1;
      }
   }
   b2Simplex.prototype.WriteCache = function (cache) {
      cache.metric = this.GetMetric();
      cache.count = Box2D.parseUInt(this.m_count);
      var vertices = this.m_vertices;
      for (var i = 0; i < this.m_count; i++) {
         cache.indexA[i] = Box2D.parseUInt(vertices[i].indexA);
         cache.indexB[i] = Box2D.parseUInt(vertices[i].indexB);
      }
   }
   b2Simplex.prototype.GetSearchDirection = function () {
      switch (this.m_count) {
      case 1:
         return this.m_v1.w.GetNegative();
      case 2:
         {
            var e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
            var sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
            if (sgn > 0.0) {
               return b2Math.CrossFV(1.0, e12);
            }
            else {
               return b2Math.CrossVF(e12, 1.0);
            }
         }
      default:
         b2Settings.b2Assert(false);
         return new b2Vec2();
      }
   }
   b2Simplex.prototype.GetClosestPoint = function () {
      switch (this.m_count) {
      case 0:
         b2Settings.b2Assert(false);
         return new b2Vec2();
      case 1:
         return this.m_v1.w;
      case 2:
         return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
      default:
         b2Settings.b2Assert(false);
         return new b2Vec2();
      }
   }
   b2Simplex.prototype.GetWitnessPoints = function (pA, pB) {
      switch (this.m_count) {
      case 0:
         b2Settings.b2Assert(false);
         break;
      case 1:
         pA.SetV(this.m_v1.wA);
         pB.SetV(this.m_v1.wB);
         break;
      case 2:
         pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
         pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
         pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
         pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
         break;
      case 3:
         pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
         pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
         break;
      default:
         b2Settings.b2Assert(false);
         break;
      }
   }
   b2Simplex.prototype.GetMetric = function () {
      switch (this.m_count) {
      case 0:
         b2Settings.b2Assert(false);
         return 0.0;
      case 1:
         return 0.0;
      case 2:
         return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
      case 3:
         return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
      default:
         b2Settings.b2Assert(false);
         return 0.0;
      }
   }
   b2Simplex.prototype.Solve2 = function () {
      var w1 = this.m_v1.w;
      var w2 = this.m_v2.w;
      var e12 = b2Math.SubtractVV(w2, w1);
      var d12_2 = (-(w1.x * e12.x + w1.y * e12.y));
      if (d12_2 <= 0.0) {
         this.m_v1.a = 1.0;
         this.m_count = 1;
         return;
      }
      var d12_1 = (w2.x * e12.x + w2.y * e12.y);
      if (d12_1 <= 0.0) {
         this.m_v2.a = 1.0;
         this.m_count = 1;
         this.m_v1.Set(this.m_v2);
         return;
      }
      var inv_d12 = 1.0 / (d12_1 + d12_2);
      this.m_v1.a = d12_1 * inv_d12;
      this.m_v2.a = d12_2 * inv_d12;
      this.m_count = 2;
   }
   b2Simplex.prototype.Solve3 = function () {
      var w1 = this.m_v1.w;
      var w2 = this.m_v2.w;
      var w3 = this.m_v3.w;
      var e12 = b2Math.SubtractVV(w2, w1);
      var w1e12 = b2Math.Dot(w1, e12);
      var w2e12 = b2Math.Dot(w2, e12);
      var d12_1 = w2e12;
      var d12_2 = (-w1e12);
      var e13 = b2Math.SubtractVV(w3, w1);
      var w1e13 = b2Math.Dot(w1, e13);
      var w3e13 = b2Math.Dot(w3, e13);
      var d13_1 = w3e13;
      var d13_2 = (-w1e13);
      var e23 = b2Math.SubtractVV(w3, w2);
      var w2e23 = b2Math.Dot(w2, e23);
      var w3e23 = b2Math.Dot(w3, e23);
      var d23_1 = w3e23;
      var d23_2 = (-w2e23);
      var n123 = b2Math.CrossVV(e12, e13);
      var d123_1 = n123 * b2Math.CrossVV(w2, w3);
      var d123_2 = n123 * b2Math.CrossVV(w3, w1);
      var d123_3 = n123 * b2Math.CrossVV(w1, w2);
      if (d12_2 <= 0.0 && d13_2 <= 0.0) {
         this.m_v1.a = 1.0;
         this.m_count = 1;
         return;
      }
      if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
         var inv_d12 = 1.0 / (d12_1 + d12_2);
         this.m_v1.a = d12_1 * inv_d12;
         this.m_v2.a = d12_2 * inv_d12;
         this.m_count = 2;
         return;
      }
      if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
         var inv_d13 = 1.0 / (d13_1 + d13_2);
         this.m_v1.a = d13_1 * inv_d13;
         this.m_v3.a = d13_2 * inv_d13;
         this.m_count = 2;
         this.m_v2.Set(this.m_v3);
         return;
      }
      if (d12_1 <= 0.0 && d23_2 <= 0.0) {
         this.m_v2.a = 1.0;
         this.m_count = 1;
         this.m_v1.Set(this.m_v2);
         return;
      }
      if (d13_1 <= 0.0 && d23_1 <= 0.0) {
         this.m_v3.a = 1.0;
         this.m_count = 1;
         this.m_v1.Set(this.m_v3);
         return;
      }
      if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
         var inv_d23 = 1.0 / (d23_1 + d23_2);
         this.m_v2.a = d23_1 * inv_d23;
         this.m_v3.a = d23_2 * inv_d23;
         this.m_count = 2;
         this.m_v1.Set(this.m_v3);
         return;
      }
      var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
      this.m_v1.a = d123_1 * inv_d123;
      this.m_v2.a = d123_2 * inv_d123;
      this.m_v3.a = d123_3 * inv_d123;
      this.m_count = 3;
   }
   b2SimplexCache.b2SimplexCache = function () {
      this.indexA = new Vector_a2j_Number(3);
      this.indexB = new Vector_a2j_Number(3);
   };
   b2SimplexVertex.b2SimplexVertex = function () {};
   b2SimplexVertex.prototype.Set = function (other) {
      this.wA.SetV(other.wA);
      this.wB.SetV(other.wB);
      this.w.SetV(other.w);
      this.a = other.a;
      this.indexA = other.indexA;
      this.indexB = other.indexB;
   }
   b2TimeOfImpact.b2TimeOfImpact = function () {};
   b2TimeOfImpact.TimeOfImpact = function (input) {
      ++b2TimeOfImpact.b2_toiCalls;
      var proxyA = input.proxyA;
      var proxyB = input.proxyB;
      var sweepA = input.sweepA;
      var sweepB = input.sweepB;
      b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
      b2Settings.b2Assert(1.0 - sweepA.t0 > Number.MIN_VALUE);
      var radius = proxyA.m_radius + proxyB.m_radius;
      var tolerance = input.tolerance;
      var alpha = 0.0;
      var k_maxIterations = 1000;
      var iter = 0;
      var target = 0.0;
      b2TimeOfImpact.s_cache.count = 0;
      b2TimeOfImpact.s_distanceInput.useRadii = false;
      for (;;) {
         sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
         sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
         b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
         b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
         b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
         b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
         b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
         if (b2TimeOfImpact.s_distanceOutput.distance <= 0.0) {
            alpha = 1.0;
            break;
         }
         b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
         var separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
         if (separation <= 0.0) {
            alpha = 1.0;
            break;
         }
         if (iter == 0) {
            if (separation > radius) {
               target = b2Math.Max(radius - tolerance, 0.75 * radius);
            }
            else {
               target = b2Math.Max(separation - tolerance, 0.02 * radius);
            }
         }
         if (separation - target < 0.5 * tolerance) {
            if (iter == 0) {
               alpha = 1.0;
               break;
            }
            break;
         }
         var newAlpha = alpha; {
            var x1 = alpha;
            var x2 = 1.0;
            var f1 = separation;
            sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
            sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
            var f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
            if (f2 >= target) {
               alpha = 1.0;
               break;
            }
            var rootIterCount = 0;
            for (;;) {
               var x = 0;
               if (rootIterCount & 1) {
                  x = x1 + (target - f1) * (x2 - x1) / (f2 - f1);
               }
               else {
                  x = 0.5 * (x1 + x2);
               }
               sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
               sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
               var f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
               if (b2Math.Abs(f - target) < 0.025 * tolerance) {
                  newAlpha = x;
                  break;
               }
               if (f > target) {
                  x1 = x;
                  f1 = f;
               }
               else {
                  x2 = x;
                  f2 = f;
               }++rootIterCount;
               ++b2TimeOfImpact.b2_toiRootIters;
               if (rootIterCount == 50) {
                  break;
               }
            }
            b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
         }
         if (newAlpha < (1.0 + 100.0 * Number.MIN_VALUE) * alpha) {
            break;
         }
         alpha = newAlpha;
         iter++;
         ++b2TimeOfImpact.b2_toiIters;
         if (iter == k_maxIterations) {
            break;
         }
      }
      b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
      return alpha;
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
      Box2D.Collision.b2TimeOfImpact.s_cache = new b2SimplexCache();
      Box2D.Collision.b2TimeOfImpact.s_distanceInput = new b2DistanceInput();
      Box2D.Collision.b2TimeOfImpact.s_xfA = new b2Transform();
      Box2D.Collision.b2TimeOfImpact.s_xfB = new b2Transform();
      Box2D.Collision.b2TimeOfImpact.s_fcn = new b2SeparationFunction();
      Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput();
   });
   b2TOIInput.b2TOIInput = function () {
      this.proxyA = new b2DistanceProxy();
      this.proxyB = new b2DistanceProxy();
      this.sweepA = new b2Sweep();
      this.sweepB = new b2Sweep();
   };
   b2WorldManifold.b2WorldManifold = function () {
      this.m_normal = new b2Vec2();
   };
   b2WorldManifold.prototype.b2WorldManifold = function () {
      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         this.m_points[i] = new b2Vec2();
      }
   }
   b2WorldManifold.prototype.Initialize = function (manifold, xfA, radiusA, xfB, radiusB) {
      if (radiusA === undefined) radiusA = 0;
      if (radiusB === undefined) radiusB = 0;
      if (manifold.m_pointCount == 0) {
         return;
      }
      var i = 0;
      var tVec;
      var tMat;
      var normalX = 0;
      var normalY = 0;
      var planePointX = 0;
      var planePointY = 0;
      var clipPointX = 0;
      var clipPointY = 0;
      switch (manifold.m_type) {
      case b2Manifold.e_circles:
         {
            tMat = xfA.R;
            tVec = manifold.m_localPoint;
            var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = xfB.R;
            tVec = manifold.m_points[0].m_localPoint;
            var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            var dX = pointBX - pointAX;
            var dY = pointBY - pointAY;
            var d2 = dX * dX + dY * dY;
            if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
               var d = Math.sqrt(d2);
               this.m_normal.x = dX / d;
               this.m_normal.y = dY / d;
            }
            else {
               this.m_normal.x = 1;
               this.m_normal.y = 0;
            }
            var cAX = pointAX + radiusA * this.m_normal.x;
            var cAY = pointAY + radiusA * this.m_normal.y;
            var cBX = pointBX - radiusB * this.m_normal.x;
            var cBY = pointBY - radiusB * this.m_normal.y;
            this.m_points[0].x = 0.5 * (cAX + cBX);
            this.m_points[0].y = 0.5 * (cAY + cBY);
         }
         break;
      case b2Manifold.e_faceA:
         {
            tMat = xfA.R;
            tVec = manifold.m_localPlaneNormal;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = xfA.R;
            tVec = manifold.m_localPoint;
            planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            this.m_normal.x = normalX;
            this.m_normal.y = normalY;
            for (i = 0;
            i < manifold.m_pointCount; i++) {
               tMat = xfB.R;
               tVec = manifold.m_points[i].m_localPoint;
               clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
               clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
               this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
               this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY;
            }
         }
         break;
      case b2Manifold.e_faceB:
         {
            tMat = xfB.R;
            tVec = manifold.m_localPlaneNormal;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = xfB.R;
            tVec = manifold.m_localPoint;
            planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            this.m_normal.x = (-normalX);
            this.m_normal.y = (-normalY);
            for (i = 0;
            i < manifold.m_pointCount; i++) {
               tMat = xfA.R;
               tVec = manifold.m_points[i].m_localPoint;
               clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
               clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
               this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
               this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY;
            }
         }
         break;
      }
   }
   ClipVertex.ClipVertex = function () {
      this.v = new b2Vec2();
      this.id = new b2ContactID();
   };
   ClipVertex.prototype.Set = function (other) {
      this.v.SetV(other.v);
      this.id.Set(other.id);
   }
   Features.Features = function () {};
   Object.defineProperty(Features.prototype, 'referenceEdge', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._referenceEdge;
      }
   });
   Object.defineProperty(Features.prototype, 'referenceEdge', {
      enumerable: false,
      configurable: true,
      set: function (value) {
         if (value === undefined) value = 0;
         this._referenceEdge = value;
         this._m_id._key = (this._m_id._key & 0xffffff00) | (this._referenceEdge & 0x000000ff);
      }
   });
   Object.defineProperty(Features.prototype, 'incidentEdge', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._incidentEdge;
      }
   });
   Object.defineProperty(Features.prototype, 'incidentEdge', {
      enumerable: false,
      configurable: true,
      set: function (value) {
         if (value === undefined) value = 0;
         this._incidentEdge = value;
         this._m_id._key = (this._m_id._key & 0xffff00ff) | ((this._incidentEdge << 8) & 0x0000ff00);
      }
   });
   Object.defineProperty(Features.prototype, 'incidentVertex', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._incidentVertex;
      }
   });
   Object.defineProperty(Features.prototype, 'incidentVertex', {
      enumerable: false,
      configurable: true,
      set: function (value) {
         if (value === undefined) value = 0;
         this._incidentVertex = value;
         this._m_id._key = (this._m_id._key & 0xff00ffff) | ((this._incidentVertex << 16) & 0x00ff0000);
      }
   });
   Object.defineProperty(Features.prototype, 'flip', {
      enumerable: false,
      configurable: true,
      get: function () {
         return this._flip;
      }
   });
   Object.defineProperty(Features.prototype, 'flip', {
      enumerable: false,
      configurable: true,
      set: function (value) {
         if (value === undefined) value = 0;
         this._flip = value;
         this._m_id._key = (this._m_id._key & 0x00ffffff) | ((this._flip << 24) & 0xff000000);
      }
   });
})();
(function () {
   var b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2AABB = Box2D.Collision.b2AABB,
      b2Bound = Box2D.Collision.b2Bound,
      b2BoundValues = Box2D.Collision.b2BoundValues,
      b2Collision = Box2D.Collision.b2Collision,
      b2ContactID = Box2D.Collision.b2ContactID,
      b2ContactPoint = Box2D.Collision.b2ContactPoint,
      b2Distance = Box2D.Collision.b2Distance,
      b2DistanceInput = Box2D.Collision.b2DistanceInput,
      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
      b2DynamicTree = Box2D.Collision.b2DynamicTree,
      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
      b2Manifold = Box2D.Collision.b2Manifold,
      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
      b2Point = Box2D.Collision.b2Point,
      b2RayCastInput = Box2D.Collision.b2RayCastInput,
      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
      b2Segment = Box2D.Collision.b2Segment,
      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
      b2Simplex = Box2D.Collision.b2Simplex,
      b2SimplexCache = Box2D.Collision.b2SimplexCache,
      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
      b2TOIInput = Box2D.Collision.b2TOIInput,
      b2WorldManifold = Box2D.Collision.b2WorldManifold,
      ClipVertex = Box2D.Collision.ClipVertex,
      Features = Box2D.Collision.Features,
      IBroadPhase = Box2D.Collision.IBroadPhase;

   Box2D.inherit(b2CircleShape, Box2D.Collision.Shapes.b2Shape);
   b2CircleShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
   b2CircleShape.b2CircleShape = function () {
      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
      this.m_p = new b2Vec2();
   };
   b2CircleShape.prototype.Copy = function () {
      var s = new b2CircleShape();
      s.Set(this);
      return s;
   }
   b2CircleShape.prototype.Set = function (other) {
      this.__super.Set.call(this, other);
      if (Box2D.is(other, b2CircleShape)) {
         var other2 = (other instanceof b2CircleShape ? other : null);
         this.m_p.SetV(other2.m_p);
      }
   }
   b2CircleShape.prototype.TestPoint = function (transform, p) {
      var tMat = transform.R;
      var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
      var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
      dX = p.x - dX;
      dY = p.y - dY;
      return (dX * dX + dY * dY) <= this.m_radius * this.m_radius;
   }
   b2CircleShape.prototype.RayCast = function (output, input, transform) {
      var tMat = transform.R;
      var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
      var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
      var sX = input.p1.x - positionX;
      var sY = input.p1.y - positionY;
      var b = (sX * sX + sY * sY) - this.m_radius * this.m_radius;
      var rX = input.p2.x - input.p1.x;
      var rY = input.p2.y - input.p1.y;
      var c = (sX * rX + sY * rY);
      var rr = (rX * rX + rY * rY);
      var sigma = c * c - rr * b;
      if (sigma < 0.0 || rr < Number.MIN_VALUE) {
         return false;
      }
      var a = (-(c + Math.sqrt(sigma)));
      if (0.0 <= a && a <= input.maxFraction * rr) {
         a /= rr;
         output.fraction = a;
         output.normal.x = sX + a * rX;
         output.normal.y = sY + a * rY;
         output.normal.Normalize();
         return true;
      }
      return false;
   }
   b2CircleShape.prototype.ComputeAABB = function (aabb, transform) {
      var tMat = transform.R;
      var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
      var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
      aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
      aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius);
   }
   b2CircleShape.prototype.ComputeMass = function (massData, density) {
      if (density === undefined) density = 0;
      massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
      massData.center.SetV(this.m_p);
      massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
   }
   b2CircleShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
      if (offset === undefined) offset = 0;
      var p = b2Math.MulX(xf, this.m_p);
      var l = (-(b2Math.Dot(normal, p) - offset));
      if (l < (-this.m_radius) + Number.MIN_VALUE) {
         return 0;
      }
      if (l > this.m_radius) {
         c.SetV(p);
         return Math.PI * this.m_radius * this.m_radius;
      }
      var r2 = this.m_radius * this.m_radius;
      var l2 = l * l;
      var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
      var com = (-2 / 3 * Math.pow(r2 - l2, 1.5) / area);
      c.x = p.x + normal.x * com;
      c.y = p.y + normal.y * com;
      return area;
   }
   b2CircleShape.prototype.GetLocalPosition = function () {
      return this.m_p;
   }
   b2CircleShape.prototype.SetLocalPosition = function (position) {
      this.m_p.SetV(position);
   }
   b2CircleShape.prototype.GetRadius = function () {
      return this.m_radius;
   }
   b2CircleShape.prototype.SetRadius = function (radius) {
      if (radius === undefined) radius = 0;
      this.m_radius = radius;
   }
   b2CircleShape.prototype.b2CircleShape = function (radius) {
      if (radius === undefined) radius = 0;
      this.__super.b2Shape.call(this);
      this.m_type = b2Shape.e_circleShape;
      this.m_radius = radius;
   }
   b2EdgeChainDef.b2EdgeChainDef = function () {};
   b2EdgeChainDef.prototype.b2EdgeChainDef = function () {
      this.vertexCount = 0;
      this.isALoop = true;
      this.vertices = [];
   }
   Box2D.inherit(b2EdgeShape, Box2D.Collision.Shapes.b2Shape);
   b2EdgeShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
   b2EdgeShape.b2EdgeShape = function () {
      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
      this.s_supportVec = new b2Vec2();
      this.m_v1 = new b2Vec2();
      this.m_v2 = new b2Vec2();
      this.m_coreV1 = new b2Vec2();
      this.m_coreV2 = new b2Vec2();
      this.m_normal = new b2Vec2();
      this.m_direction = new b2Vec2();
      this.m_cornerDir1 = new b2Vec2();
      this.m_cornerDir2 = new b2Vec2();
   };
   b2EdgeShape.prototype.TestPoint = function (transform, p) {
      return false;
   }
   b2EdgeShape.prototype.RayCast = function (output, input, transform) {
      var tMat;
      var rX = input.p2.x - input.p1.x;
      var rY = input.p2.y - input.p1.y;
      tMat = transform.R;
      var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
      var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
      var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
      var nY = (-(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X));
      var k_slop = 100.0 * Number.MIN_VALUE;
      var denom = (-(rX * nX + rY * nY));
      if (denom > k_slop) {
         var bX = input.p1.x - v1X;
         var bY = input.p1.y - v1Y;
         var a = (bX * nX + bY * nY);
         if (0.0 <= a && a <= input.maxFraction * denom) {
            var mu2 = (-rX * bY) + rY * bX;
            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
               a /= denom;
               output.fraction = a;
               var nLen = Math.sqrt(nX * nX + nY * nY);
               output.normal.x = nX / nLen;
               output.normal.y = nY / nLen;
               return true;
            }
         }
      }
      return false;
   }
   b2EdgeShape.prototype.ComputeAABB = function (aabb, transform) {
      var tMat = transform.R;
      var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
      var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
      var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
      var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
      if (v1X < v2X) {
         aabb.lowerBound.x = v1X;
         aabb.upperBound.x = v2X;
      }
      else {
         aabb.lowerBound.x = v2X;
         aabb.upperBound.x = v1X;
      }
      if (v1Y < v2Y) {
         aabb.lowerBound.y = v1Y;
         aabb.upperBound.y = v2Y;
      }
      else {
         aabb.lowerBound.y = v2Y;
         aabb.upperBound.y = v1Y;
      }
   }
   b2EdgeShape.prototype.ComputeMass = function (massData, density) {
      if (density === undefined) density = 0;
      massData.mass = 0;
      massData.center.SetV(this.m_v1);
      massData.I = 0;
   }
   b2EdgeShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
      if (offset === undefined) offset = 0;
      var v0 = new b2Vec2(normal.x * offset, normal.y * offset);
      var v1 = b2Math.MulX(xf, this.m_v1);
      var v2 = b2Math.MulX(xf, this.m_v2);
      var d1 = b2Math.Dot(normal, v1) - offset;
      var d2 = b2Math.Dot(normal, v2) - offset;
      if (d1 > 0) {
         if (d2 > 0) {
            return 0;
         }
         else {
            v1.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
            v1.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
         }
      }
      else {
         if (d2 > 0) {
            v2.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
            v2.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
         }
         else {}
      }
      c.x = (v0.x + v1.x + v2.x) / 3;
      c.y = (v0.y + v1.y + v2.y) / 3;
      return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x));
   }
   b2EdgeShape.prototype.GetLength = function () {
      return this.m_length;
   }
   b2EdgeShape.prototype.GetVertex1 = function () {
      return this.m_v1;
   }
   b2EdgeShape.prototype.GetVertex2 = function () {
      return this.m_v2;
   }
   b2EdgeShape.prototype.GetCoreVertex1 = function () {
      return this.m_coreV1;
   }
   b2EdgeShape.prototype.GetCoreVertex2 = function () {
      return this.m_coreV2;
   }
   b2EdgeShape.prototype.GetNormalVector = function () {
      return this.m_normal;
   }
   b2EdgeShape.prototype.GetDirectionVector = function () {
      return this.m_direction;
   }
   b2EdgeShape.prototype.GetCorner1Vector = function () {
      return this.m_cornerDir1;
   }
   b2EdgeShape.prototype.GetCorner2Vector = function () {
      return this.m_cornerDir2;
   }
   b2EdgeShape.prototype.Corner1IsConvex = function () {
      return this.m_cornerConvex1;
   }
   b2EdgeShape.prototype.Corner2IsConvex = function () {
      return this.m_cornerConvex2;
   }
   b2EdgeShape.prototype.GetFirstVertex = function (xf) {
      var tMat = xf.R;
      return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y));
   }
   b2EdgeShape.prototype.GetNextEdge = function () {
      return this.m_nextEdge;
   }
   b2EdgeShape.prototype.GetPrevEdge = function () {
      return this.m_prevEdge;
   }
   b2EdgeShape.prototype.Support = function (xf, dX, dY) {
      if (dX === undefined) dX = 0;
      if (dY === undefined) dY = 0;
      var tMat = xf.R;
      var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
      var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
      var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
      var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
      if ((v1X * dX + v1Y * dY) > (v2X * dX + v2Y * dY)) {
         this.s_supportVec.x = v1X;
         this.s_supportVec.y = v1Y;
      }
      else {
         this.s_supportVec.x = v2X;
         this.s_supportVec.y = v2Y;
      }
      return this.s_supportVec;
   }
   b2EdgeShape.prototype.b2EdgeShape = function (v1, v2) {
      this.__super.b2Shape.call(this);
      this.m_type = b2Shape.e_edgeShape;
      this.m_prevEdge = null;
      this.m_nextEdge = null;
      this.m_v1 = v1;
      this.m_v2 = v2;
      this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
      this.m_length = this.m_direction.Normalize();
      this.m_normal.Set(this.m_direction.y, (-this.m_direction.x));
      this.m_coreV1.Set((-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x)) + this.m_v1.x, (-b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y)) + this.m_v1.y);
      this.m_coreV2.Set((-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x)) + this.m_v2.x, (-b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y)) + this.m_v2.y);
      this.m_cornerDir1 = this.m_normal;
      this.m_cornerDir2.Set((-this.m_normal.x), (-this.m_normal.y));
   }
   b2EdgeShape.prototype.SetPrevEdge = function (edge, core, cornerDir, convex) {
      this.m_prevEdge = edge;
      this.m_coreV1 = core;
      this.m_cornerDir1 = cornerDir;
      this.m_cornerConvex1 = convex;
   }
   b2EdgeShape.prototype.SetNextEdge = function (edge, core, cornerDir, convex) {
      this.m_nextEdge = edge;
      this.m_coreV2 = core;
      this.m_cornerDir2 = cornerDir;
      this.m_cornerConvex2 = convex;
   }
   b2MassData.b2MassData = function () {
      this.mass = 0.0;
      this.center = new b2Vec2(0, 0);
      this.I = 0.0;
   };
   Box2D.inherit(b2PolygonShape, Box2D.Collision.Shapes.b2Shape);
   b2PolygonShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
   b2PolygonShape.b2PolygonShape = function () {
      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
   };
   b2PolygonShape.prototype.Copy = function () {
      var s = new b2PolygonShape();
      s.Set(this);
      return s;
   }
   b2PolygonShape.prototype.Set = function (other) {
      this.__super.Set.call(this, other);
      if (Box2D.is(other, b2PolygonShape)) {
         var other2 = (other instanceof b2PolygonShape ? other : null);
         this.m_centroid.SetV(other2.m_centroid);
         this.m_vertexCount = other2.m_vertexCount;
         this.Reserve(this.m_vertexCount);
         for (var i = 0; i < this.m_vertexCount; i++) {
            this.m_vertices[i].SetV(other2.m_vertices[i]);
            this.m_normals[i].SetV(other2.m_normals[i]);
         }
      }
   }
   b2PolygonShape.prototype.SetAsArray = function (vertices, vertexCount) {
      if (vertexCount === undefined) vertexCount = 0;
      var v = new Vector();
      var i = 0,
         tVec;
      for (i = 0;
      i < vertices.length; ++i) {
         tVec = vertices[i];
         v.push(tVec);
      }
      this.SetAsVector(v, vertexCount);
   }
   b2PolygonShape.AsArray = function (vertices, vertexCount) {
      if (vertexCount === undefined) vertexCount = 0;
      var polygonShape = new b2PolygonShape();
      polygonShape.SetAsArray(vertices, vertexCount);
      return polygonShape;
   }
   b2PolygonShape.prototype.SetAsVector = function (vertices, vertexCount) {
      if (vertexCount === undefined) vertexCount = 0;
      if (vertexCount == 0) vertexCount = vertices.length;
      b2Settings.b2Assert(2 <= vertexCount);
      this.m_vertexCount = vertexCount;
      this.Reserve(vertexCount);
      var i = 0;
      for (i = 0;
      i < this.m_vertexCount; i++) {
         this.m_vertices[i].SetV(vertices[i]);
      }
      for (i = 0;
      i < this.m_vertexCount; ++i) {
         var i1 = parseInt(i);
         var i2 = parseInt(i + 1 < this.m_vertexCount ? i + 1 : 0);
         var edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
         b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
         this.m_normals[i].SetV(b2Math.CrossVF(edge, 1.0));
         this.m_normals[i].Normalize();
      }
      this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount);
   }
   b2PolygonShape.AsVector = function (vertices, vertexCount) {
      if (vertexCount === undefined) vertexCount = 0;
      var polygonShape = new b2PolygonShape();
      polygonShape.SetAsVector(vertices, vertexCount);
      return polygonShape;
   }
   b2PolygonShape.prototype.SetAsBox = function (hx, hy) {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      this.m_vertexCount = 4;
      this.Reserve(4);
      this.m_vertices[0].Set((-hx), (-hy));
      this.m_vertices[1].Set(hx, (-hy));
      this.m_vertices[2].Set(hx, hy);
      this.m_vertices[3].Set((-hx), hy);
      this.m_normals[0].Set(0.0, (-1.0));
      this.m_normals[1].Set(1.0, 0.0);
      this.m_normals[2].Set(0.0, 1.0);
      this.m_normals[3].Set((-1.0), 0.0);
      this.m_centroid.SetZero();
   }
   b2PolygonShape.AsBox = function (hx, hy) {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      var polygonShape = new b2PolygonShape();
      polygonShape.SetAsBox(hx, hy);
      return polygonShape;
   }
   b2PolygonShape.prototype.SetAsOrientedBox = function (hx, hy, center, angle) {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      if (center === undefined) center = null;
      if (angle === undefined) angle = 0.0;
      this.m_vertexCount = 4;
      this.Reserve(4);
      this.m_vertices[0].Set((-hx), (-hy));
      this.m_vertices[1].Set(hx, (-hy));
      this.m_vertices[2].Set(hx, hy);
      this.m_vertices[3].Set((-hx), hy);
      this.m_normals[0].Set(0.0, (-1.0));
      this.m_normals[1].Set(1.0, 0.0);
      this.m_normals[2].Set(0.0, 1.0);
      this.m_normals[3].Set((-1.0), 0.0);
      this.m_centroid = center;
      var xf = new b2Transform();
      xf.position = center;
      xf.R.Set(angle);
      for (var i = 0; i < this.m_vertexCount; ++i) {
         this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
         this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i]);
      }
   }
   b2PolygonShape.AsOrientedBox = function (hx, hy, center, angle) {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      if (center === undefined) center = null;
      if (angle === undefined) angle = 0.0;
      var polygonShape = new b2PolygonShape();
      polygonShape.SetAsOrientedBox(hx, hy, center, angle);
      return polygonShape;
   }
   b2PolygonShape.prototype.SetAsEdge = function (v1, v2) {
      this.m_vertexCount = 2;
      this.Reserve(2);
      this.m_vertices[0].SetV(v1);
      this.m_vertices[1].SetV(v2);
      this.m_centroid.x = 0.5 * (v1.x + v2.x);
      this.m_centroid.y = 0.5 * (v1.y + v2.y);
      this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1.0);
      this.m_normals[0].Normalize();
      this.m_normals[1].x = (-this.m_normals[0].x);
      this.m_normals[1].y = (-this.m_normals[0].y);
   }
   b2PolygonShape.AsEdge = function (v1, v2) {
      var polygonShape = new b2PolygonShape();
      polygonShape.SetAsEdge(v1, v2);
      return polygonShape;
   }
   b2PolygonShape.prototype.TestPoint = function (xf, p) {
      var tVec;
      var tMat = xf.R;
      var tX = p.x - xf.position.x;
      var tY = p.y - xf.position.y;
      var pLocalX = (tX * tMat.col1.x + tY * tMat.col1.y);
      var pLocalY = (tX * tMat.col2.x + tY * tMat.col2.y);
      for (var i = 0; i < this.m_vertexCount; ++i) {
         tVec = this.m_vertices[i];
         tX = pLocalX - tVec.x;
         tY = pLocalY - tVec.y;
         tVec = this.m_normals[i];
         var dot = (tVec.x * tX + tVec.y * tY);
         if (dot > 0.0) {
            return false;
         }
      }
      return true;
   }
   b2PolygonShape.prototype.RayCast = function (output, input, transform) {
      var lower = 0.0;
      var upper = input.maxFraction;
      var tX = 0;
      var tY = 0;
      var tMat;
      var tVec;
      tX = input.p1.x - transform.position.x;
      tY = input.p1.y - transform.position.y;
      tMat = transform.R;
      var p1X = (tX * tMat.col1.x + tY * tMat.col1.y);
      var p1Y = (tX * tMat.col2.x + tY * tMat.col2.y);
      tX = input.p2.x - transform.position.x;
      tY = input.p2.y - transform.position.y;
      tMat = transform.R;
      var p2X = (tX * tMat.col1.x + tY * tMat.col1.y);
      var p2Y = (tX * tMat.col2.x + tY * tMat.col2.y);
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var index = parseInt((-1));
      for (var i = 0; i < this.m_vertexCount; ++i) {
         tVec = this.m_vertices[i];
         tX = tVec.x - p1X;
         tY = tVec.y - p1Y;
         tVec = this.m_normals[i];
         var numerator = (tVec.x * tX + tVec.y * tY);
         var denominator = (tVec.x * dX + tVec.y * dY);
         if (denominator == 0.0) {
            if (numerator < 0.0) {
               return false;
            }
         }
         else {
            if (denominator < 0.0 && numerator < lower * denominator) {
               lower = numerator / denominator;
               index = i;
            }
            else if (denominator > 0.0 && numerator < upper * denominator) {
               upper = numerator / denominator;
            }
         }
         if (upper < lower - Number.MIN_VALUE) {
            return false;
         }
      }
      if (index >= 0) {
         output.fraction = lower;
         tMat = transform.R;
         tVec = this.m_normals[index];
         output.normal.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         output.normal.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         return true;
      }
      return false;
   }
   b2PolygonShape.prototype.ComputeAABB = function (aabb, xf) {
      var tMat = xf.R;
      var tVec = this.m_vertices[0];
      var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var upperX = lowerX;
      var upperY = lowerY;
      for (var i = 1; i < this.m_vertexCount; ++i) {
         tVec = this.m_vertices[i];
         var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
         var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
         lowerX = lowerX < vX ? lowerX : vX;
         lowerY = lowerY < vY ? lowerY : vY;
         upperX = upperX > vX ? upperX : vX;
         upperY = upperY > vY ? upperY : vY;
      }
      aabb.lowerBound.x = lowerX - this.m_radius;
      aabb.lowerBound.y = lowerY - this.m_radius;
      aabb.upperBound.x = upperX + this.m_radius;
      aabb.upperBound.y = upperY + this.m_radius;
   }
   b2PolygonShape.prototype.ComputeMass = function (massData, density) {
      if (density === undefined) density = 0;
      if (this.m_vertexCount == 2) {
         massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
         massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
         massData.mass = 0.0;
         massData.I = 0.0;
         return;
      }
      var centerX = 0.0;
      var centerY = 0.0;
      var area = 0.0;
      var I = 0.0;
      var p1X = 0.0;
      var p1Y = 0.0;
      var k_inv3 = 1.0 / 3.0;
      for (var i = 0; i < this.m_vertexCount; ++i) {
         var p2 = this.m_vertices[i];
         var p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
         var e1X = p2.x - p1X;
         var e1Y = p2.y - p1Y;
         var e2X = p3.x - p1X;
         var e2Y = p3.y - p1Y;
         var D = e1X * e2Y - e1Y * e2X;
         var triangleArea = 0.5 * D;area += triangleArea;
         centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
         centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
         var px = p1X;
         var py = p1Y;
         var ex1 = e1X;
         var ey1 = e1Y;
         var ex2 = e2X;
         var ey2 = e2Y;
         var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
         var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;I += D * (intx2 + inty2);
      }
      massData.mass = density * area;
      centerX *= 1.0 / area;
      centerY *= 1.0 / area;
      massData.center.Set(centerX, centerY);
      massData.I = density * I;
   }
   b2PolygonShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
      if (offset === undefined) offset = 0;
      var normalL = b2Math.MulTMV(xf.R, normal);
      var offsetL = offset - b2Math.Dot(normal, xf.position);
      var depths = new Vector_a2j_Number();
      var diveCount = 0;
      var intoIndex = parseInt((-1));
      var outoIndex = parseInt((-1));
      var lastSubmerged = false;
      var i = 0;
      for (i = 0;
      i < this.m_vertexCount; ++i) {
         depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
         var isSubmerged = depths[i] < (-Number.MIN_VALUE);
         if (i > 0) {
            if (isSubmerged) {
               if (!lastSubmerged) {
                  intoIndex = i - 1;
                  diveCount++;
               }
            }
            else {
               if (lastSubmerged) {
                  outoIndex = i - 1;
                  diveCount++;
               }
            }
         }
         lastSubmerged = isSubmerged;
      }
      switch (diveCount) {
      case 0:
         if (lastSubmerged) {
            var md = new b2MassData();
            this.ComputeMass(md, 1);
            c.SetV(b2Math.MulX(xf, md.center));
            return md.mass;
         }
         else {
            return 0;
         }
         break;
      case 1:
         if (intoIndex == (-1)) {
            intoIndex = this.m_vertexCount - 1;
         }
         else {
            outoIndex = this.m_vertexCount - 1;
         }
         break;
      }
      var intoIndex2 = parseInt((intoIndex + 1) % this.m_vertexCount);
      var outoIndex2 = parseInt((outoIndex + 1) % this.m_vertexCount);
      var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
      var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
      var intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
      var outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
      var area = 0;
      var center = new b2Vec2();
      var p2 = this.m_vertices[intoIndex2];
      var p3;
      i = intoIndex2;
      while (i != outoIndex2) {
         i = (i + 1) % this.m_vertexCount;
         if (i == outoIndex2) p3 = outoVec;
         else p3 = this.m_vertices[i];
         var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
         area += triangleArea;
         center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
         center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
         p2 = p3;
      }
      center.Multiply(1 / area);
      c.SetV(b2Math.MulX(xf, center));
      return area;
   }
   b2PolygonShape.prototype.GetVertexCount = function () {
      return this.m_vertexCount;
   }
   b2PolygonShape.prototype.GetVertices = function () {
      return this.m_vertices;
   }
   b2PolygonShape.prototype.GetNormals = function () {
      return this.m_normals;
   }
   b2PolygonShape.prototype.GetSupport = function (d) {
      var bestIndex = 0;
      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
      for (var i = 1; i < this.m_vertexCount; ++i) {
         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
         if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
         }
      }
      return bestIndex;
   }
   b2PolygonShape.prototype.GetSupportVertex = function (d) {
      var bestIndex = 0;
      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
      for (var i = 1; i < this.m_vertexCount; ++i) {
         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
         if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
         }
      }
      return this.m_vertices[bestIndex];
   }
   b2PolygonShape.prototype.Validate = function () {
      return false;
   }
   b2PolygonShape.prototype.b2PolygonShape = function () {
      this.__super.b2Shape.call(this);
      this.m_type = b2Shape.e_polygonShape;
      this.m_centroid = new b2Vec2();
      this.m_vertices = new Vector();
      this.m_normals = new Vector();
   }
   b2PolygonShape.prototype.Reserve = function (count) {
      if (count === undefined) count = 0;
      for (var i = parseInt(this.m_vertices.length); i < count; i++) {
         this.m_vertices[i] = new b2Vec2();
         this.m_normals[i] = new b2Vec2();
      }
   }
   b2PolygonShape.ComputeCentroid = function (vs, count) {
      if (count === undefined) count = 0;
      var c = new b2Vec2();
      var area = 0.0;
      var p1X = 0.0;
      var p1Y = 0.0;
      var inv3 = 1.0 / 3.0;
      for (var i = 0; i < count; ++i) {
         var p2 = vs[i];
         var p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
         var e1X = p2.x - p1X;
         var e1Y = p2.y - p1Y;
         var e2X = p3.x - p1X;
         var e2Y = p3.y - p1Y;
         var D = (e1X * e2Y - e1Y * e2X);
         var triangleArea = 0.5 * D;area += triangleArea;
         c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
         c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
      }
      c.x *= 1.0 / area;
      c.y *= 1.0 / area;
      return c;
   }
   b2PolygonShape.ComputeOBB = function (obb, vs, count) {
      if (count === undefined) count = 0;
      var i = 0;
      var p = new Vector(count + 1);
      for (i = 0;
      i < count; ++i) {
         p[i] = vs[i];
      }
      p[count] = p[0];
      var minArea = Number.MAX_VALUE;
      for (i = 1;
      i <= count; ++i) {
         var root = p[parseInt(i - 1)];
         var uxX = p[i].x - root.x;
         var uxY = p[i].y - root.y;
         var length = Math.sqrt(uxX * uxX + uxY * uxY);
         uxX /= length;
         uxY /= length;
         var uyX = (-uxY);
         var uyY = uxX;
         var lowerX = Number.MAX_VALUE;
         var lowerY = Number.MAX_VALUE;
         var upperX = (-Number.MAX_VALUE);
         var upperY = (-Number.MAX_VALUE);
         for (var j = 0; j < count; ++j) {
            var dX = p[j].x - root.x;
            var dY = p[j].y - root.y;
            var rX = (uxX * dX + uxY * dY);
            var rY = (uyX * dX + uyY * dY);
            if (rX < lowerX) lowerX = rX;
            if (rY < lowerY) lowerY = rY;
            if (rX > upperX) upperX = rX;
            if (rY > upperY) upperY = rY;
         }
         var area = (upperX - lowerX) * (upperY - lowerY);
         if (area < 0.95 * minArea) {
            minArea = area;
            obb.R.col1.x = uxX;
            obb.R.col1.y = uxY;
            obb.R.col2.x = uyX;
            obb.R.col2.y = uyY;
            var centerX = 0.5 * (lowerX + upperX);
            var centerY = 0.5 * (lowerY + upperY);
            var tMat = obb.R;
            obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
            obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
            obb.extents.x = 0.5 * (upperX - lowerX);
            obb.extents.y = 0.5 * (upperY - lowerY);
         }
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.Shapes.b2PolygonShape.s_mat = new b2Mat22();
   });
   b2Shape.b2Shape = function () {};
   b2Shape.prototype.Copy = function () {
      return null;
   }
   b2Shape.prototype.Set = function (other) {
      this.m_radius = other.m_radius;
   }
   b2Shape.prototype.GetType = function () {
      return this.m_type;
   }
   b2Shape.prototype.TestPoint = function (xf, p) {
      return false;
   }
   b2Shape.prototype.RayCast = function (output, input, transform) {
      return false;
   }
   b2Shape.prototype.ComputeAABB = function (aabb, xf) {}
   b2Shape.prototype.ComputeMass = function (massData, density) {
      if (density === undefined) density = 0;
   }
   b2Shape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
      if (offset === undefined) offset = 0;
      return 0;
   }
   b2Shape.TestOverlap = function (shape1, transform1, shape2, transform2) {
      var input = new b2DistanceInput();
      input.proxyA = new b2DistanceProxy();
      input.proxyA.Set(shape1);
      input.proxyB = new b2DistanceProxy();
      input.proxyB.Set(shape2);
      input.transformA = transform1;
      input.transformB = transform2;
      input.useRadii = true;
      var simplexCache = new b2SimplexCache();
      simplexCache.count = 0;
      var output = new b2DistanceOutput();
      b2Distance.Distance(output, simplexCache, input);
      return output.distance < 10.0 * Number.MIN_VALUE;
   }
   b2Shape.prototype.b2Shape = function () {
      this.m_type = b2Shape.e_unknownShape;
      this.m_radius = b2Settings.b2_linearSlop;
   }
   Box2D.postDefs.push(function () {
      Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt((-1));
      Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
      Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
      Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
      Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
      Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
      Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
      Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt((-1));
   });
})();
(function () {
   var b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3;

   b2Color.b2Color = function () {
      this._r = 0;
      this._g = 0;
      this._b = 0;
   };
   b2Color.prototype.b2Color = function (rr, gg, bb) {
      if (rr === undefined) rr = 0;
      if (gg === undefined) gg = 0;
      if (bb === undefined) bb = 0;
      this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
      this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
      this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
   }
   b2Color.prototype.Set = function (rr, gg, bb) {
      if (rr === undefined) rr = 0;
      if (gg === undefined) gg = 0;
      if (bb === undefined) bb = 0;
      this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
      this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
      this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
   }
   Object.defineProperty(b2Color.prototype, 'r', {
      enumerable: false,
      configurable: true,
      set: function (rr) {
         if (rr === undefined) rr = 0;
         this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
      }
   });
   Object.defineProperty(b2Color.prototype, 'g', {
      enumerable: false,
      configurable: true,
      set: function (gg) {
         if (gg === undefined) gg = 0;
         this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
      }
   });
   Object.defineProperty(b2Color.prototype, 'b', {
      enumerable: false,
      configurable: true,
      set: function (bb) {
         if (bb === undefined) bb = 0;
         this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
      }
   });
   Object.defineProperty(b2Color.prototype, 'color', {
      enumerable: false,
      configurable: true,
      get: function () {
         return (this._r << 16) | (this._g << 8) | (this._b);
      }
   });
   b2Settings.b2Settings = function () {};
   b2Settings.b2MixFriction = function (friction1, friction2) {
      if (friction1 === undefined) friction1 = 0;
      if (friction2 === undefined) friction2 = 0;
      return Math.sqrt(friction1 * friction2);
   }
   b2Settings.b2MixRestitution = function (restitution1, restitution2) {
      if (restitution1 === undefined) restitution1 = 0;
      if (restitution2 === undefined) restitution2 = 0;
      return restitution1 > restitution2 ? restitution1 : restitution2;
   }
   b2Settings.b2Assert = function (a) {
      if (!a) {
         throw "Assertion Failed";
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Common.b2Settings.VERSION = "2.1alpha";
      Box2D.Common.b2Settings.USHRT_MAX = 0x0000ffff;
      Box2D.Common.b2Settings.b2_pi = Math.PI;
      Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
      Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
      Box2D.Common.b2Settings.b2_aabbMultiplier = 2.0;
      Box2D.Common.b2Settings.b2_polygonRadius = 2.0 * b2Settings.b2_linearSlop;
      Box2D.Common.b2Settings.b2_linearSlop = 0.005;
      Box2D.Common.b2Settings.b2_angularSlop = 2.0 / 180.0 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_toiSlop = 8.0 * b2Settings.b2_linearSlop;
      Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
      Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
      Box2D.Common.b2Settings.b2_velocityThreshold = 1.0;
      Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
      Box2D.Common.b2Settings.b2_maxAngularCorrection = 8.0 / 180.0 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_maxTranslation = 2.0;
      Box2D.Common.b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
      Box2D.Common.b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
      Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
      Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
      Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
      Box2D.Common.b2Settings.b2_angularSleepTolerance = 2.0 / 180.0 * b2Settings.b2_pi;
   });
})();
(function () {
   var b2AABB = Box2D.Collision.b2AABB,
      b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3;

   b2Mat22.b2Mat22 = function () {
      this.col1 = new b2Vec2();
      this.col2 = new b2Vec2();
   };
   b2Mat22.prototype.b2Mat22 = function () {
      this.SetIdentity();
   }
   b2Mat22.FromAngle = function (angle) {
      if (angle === undefined) angle = 0;
      var mat = new b2Mat22();
      mat.Set(angle);
      return mat;
   }
   b2Mat22.FromVV = function (c1, c2) {
      var mat = new b2Mat22();
      mat.SetVV(c1, c2);
      return mat;
   }
   b2Mat22.prototype.Set = function (angle) {
      if (angle === undefined) angle = 0;
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      this.col1.x = c;
      this.col2.x = (-s);
      this.col1.y = s;
      this.col2.y = c;
   }
   b2Mat22.prototype.SetVV = function (c1, c2) {
      this.col1.SetV(c1);
      this.col2.SetV(c2);
   }
   b2Mat22.prototype.Copy = function () {
      var mat = new b2Mat22();
      mat.SetM(this);
      return mat;
   }
   b2Mat22.prototype.SetM = function (m) {
      this.col1.SetV(m.col1);
      this.col2.SetV(m.col2);
   }
   b2Mat22.prototype.AddM = function (m) {
      this.col1.x += m.col1.x;
      this.col1.y += m.col1.y;
      this.col2.x += m.col2.x;
      this.col2.y += m.col2.y;
   }
   b2Mat22.prototype.SetIdentity = function () {
      this.col1.x = 1.0;
      this.col2.x = 0.0;
      this.col1.y = 0.0;
      this.col2.y = 1.0;
   }
   b2Mat22.prototype.SetZero = function () {
      this.col1.x = 0.0;
      this.col2.x = 0.0;
      this.col1.y = 0.0;
      this.col2.y = 0.0;
   }
   b2Mat22.prototype.GetAngle = function () {
      return Math.atan2(this.col1.y, this.col1.x);
   }
   b2Mat22.prototype.GetInverse = function (out) {
      var a = this.col1.x;
      var b = this.col2.x;
      var c = this.col1.y;
      var d = this.col2.y;
      var det = a * d - b * c;
      if (det != 0.0) {
         det = 1.0 / det;
      }
      out.col1.x = det * d;
      out.col2.x = (-det * b);
      out.col1.y = (-det * c);
      out.col2.y = det * a;
      return out;
   }
   b2Mat22.prototype.Solve = function (out, bX, bY) {
      if (bX === undefined) bX = 0;
      if (bY === undefined) bY = 0;
      var a11 = this.col1.x;
      var a12 = this.col2.x;
      var a21 = this.col1.y;
      var a22 = this.col2.y;
      var det = a11 * a22 - a12 * a21;
      if (det != 0.0) {
         det = 1.0 / det;
      }
      out.x = det * (a22 * bX - a12 * bY);
      out.y = det * (a11 * bY - a21 * bX);
      return out;
   }
   b2Mat22.prototype.Abs = function () {
      this.col1.Abs();
      this.col2.Abs();
   }
   b2Mat33.b2Mat33 = function () {
      this.col1 = new b2Vec3();
      this.col2 = new b2Vec3();
      this.col3 = new b2Vec3();
   };
   b2Mat33.prototype.b2Mat33 = function (c1, c2, c3) {
      if (c1 === undefined) c1 = null;
      if (c2 === undefined) c2 = null;
      if (c3 === undefined) c3 = null;
      if (!c1 && !c2 && !c3) {
         this.col1.SetZero();
         this.col2.SetZero();
         this.col3.SetZero();
      }
      else {
         this.col1.SetV(c1);
         this.col2.SetV(c2);
         this.col3.SetV(c3);
      }
   }
   b2Mat33.prototype.SetVVV = function (c1, c2, c3) {
      this.col1.SetV(c1);
      this.col2.SetV(c2);
      this.col3.SetV(c3);
   }
   b2Mat33.prototype.Copy = function () {
      return new b2Mat33(this.col1, this.col2, this.col3);
   }
   b2Mat33.prototype.SetM = function (m) {
      this.col1.SetV(m.col1);
      this.col2.SetV(m.col2);
      this.col3.SetV(m.col3);
   }
   b2Mat33.prototype.AddM = function (m) {
      this.col1.x += m.col1.x;
      this.col1.y += m.col1.y;
      this.col1.z += m.col1.z;
      this.col2.x += m.col2.x;
      this.col2.y += m.col2.y;
      this.col2.z += m.col2.z;
      this.col3.x += m.col3.x;
      this.col3.y += m.col3.y;
      this.col3.z += m.col3.z;
   }
   b2Mat33.prototype.SetIdentity = function () {
      this.col1.x = 1.0;
      this.col2.x = 0.0;
      this.col3.x = 0.0;
      this.col1.y = 0.0;
      this.col2.y = 1.0;
      this.col3.y = 0.0;
      this.col1.z = 0.0;
      this.col2.z = 0.0;
      this.col3.z = 1.0;
   }
   b2Mat33.prototype.SetZero = function () {
      this.col1.x = 0.0;
      this.col2.x = 0.0;
      this.col3.x = 0.0;
      this.col1.y = 0.0;
      this.col2.y = 0.0;
      this.col3.y = 0.0;
      this.col1.z = 0.0;
      this.col2.z = 0.0;
      this.col3.z = 0.0;
   }
   b2Mat33.prototype.Solve22 = function (out, bX, bY) {
      if (bX === undefined) bX = 0;
      if (bY === undefined) bY = 0;
      var a11 = this.col1.x;
      var a12 = this.col2.x;
      var a21 = this.col1.y;
      var a22 = this.col2.y;
      var det = a11 * a22 - a12 * a21;
      if (det != 0.0) {
         det = 1.0 / det;
      }
      out.x = det * (a22 * bX - a12 * bY);
      out.y = det * (a11 * bY - a21 * bX);
      return out;
   }
   b2Mat33.prototype.Solve33 = function (out, bX, bY, bZ) {
      if (bX === undefined) bX = 0;
      if (bY === undefined) bY = 0;
      if (bZ === undefined) bZ = 0;
      var a11 = this.col1.x;
      var a21 = this.col1.y;
      var a31 = this.col1.z;
      var a12 = this.col2.x;
      var a22 = this.col2.y;
      var a32 = this.col2.z;
      var a13 = this.col3.x;
      var a23 = this.col3.y;
      var a33 = this.col3.z;
      var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
      if (det != 0.0) {
         det = 1.0 / det;
      }
      out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
      out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
      out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
      return out;
   }
   b2Math.b2Math = function () {};
   b2Math.IsValid = function (x) {
      if (x === undefined) x = 0;
      return isFinite(x);
   }
   b2Math.Dot = function (a, b) {
      return a.x * b.x + a.y * b.y;
   }
   b2Math.CrossVV = function (a, b) {
      return a.x * b.y - a.y * b.x;
   }
   b2Math.CrossVF = function (a, s) {
      if (s === undefined) s = 0;
      var v = new b2Vec2(s * a.y, (-s * a.x));
      return v;
   }
   b2Math.CrossFV = function (s, a) {
      if (s === undefined) s = 0;
      var v = new b2Vec2((-s * a.y), s * a.x);
      return v;
   }
   b2Math.MulMV = function (A, v) {
      var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
      return u;
   }
   b2Math.MulTMV = function (A, v) {
      var u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
      return u;
   }
   b2Math.MulX = function (T, v) {
      var a = b2Math.MulMV(T.R, v);
      a.x += T.position.x;
      a.y += T.position.y;
      return a;
   }
   b2Math.MulXT = function (T, v) {
      var a = b2Math.SubtractVV(v, T.position);
      var tX = (a.x * T.R.col1.x + a.y * T.R.col1.y);
      a.y = (a.x * T.R.col2.x + a.y * T.R.col2.y);
      a.x = tX;
      return a;
   }
   b2Math.AddVV = function (a, b) {
      var v = new b2Vec2(a.x + b.x, a.y + b.y);
      return v;
   }
   b2Math.SubtractVV = function (a, b) {
      var v = new b2Vec2(a.x - b.x, a.y - b.y);
      return v;
   }
   b2Math.Distance = function (a, b) {
      var cX = a.x - b.x;
      var cY = a.y - b.y;
      return Math.sqrt(cX * cX + cY * cY);
   }
   b2Math.DistanceSquared = function (a, b) {
      var cX = a.x - b.x;
      var cY = a.y - b.y;
      return (cX * cX + cY * cY);
   }
   b2Math.MulFV = function (s, a) {
      if (s === undefined) s = 0;
      var v = new b2Vec2(s * a.x, s * a.y);
      return v;
   }
   b2Math.AddMM = function (A, B) {
      var C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
      return C;
   }
   b2Math.MulMM = function (A, B) {
      var C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
      return C;
   }
   b2Math.MulTMM = function (A, B) {
      var c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
      var c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
      var C = b2Mat22.FromVV(c1, c2);
      return C;
   }
   b2Math.Abs = function (a) {
      if (a === undefined) a = 0;
      return a > 0.0 ? a : (-a);
   }
   b2Math.AbsV = function (a) {
      var b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
      return b;
   }
   b2Math.AbsM = function (A) {
      var B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
      return B;
   }
   b2Math.Min = function (a, b) {
      if (a === undefined) a = 0;
      if (b === undefined) b = 0;
      return a < b ? a : b;
   }
   b2Math.MinV = function (a, b) {
      var c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
      return c;
   }
   b2Math.Max = function (a, b) {
      if (a === undefined) a = 0;
      if (b === undefined) b = 0;
      return a > b ? a : b;
   }
   b2Math.MaxV = function (a, b) {
      var c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
      return c;
   }
   b2Math.Clamp = function (a, low, high) {
      if (a === undefined) a = 0;
      if (low === undefined) low = 0;
      if (high === undefined) high = 0;
      return a < low ? low : a > high ? high : a;
   }
   b2Math.ClampV = function (a, low, high) {
      return b2Math.MaxV(low, b2Math.MinV(a, high));
   }
   b2Math.Swap = function (a, b) {
      var tmp = a[0];
      a[0] = b[0];
      b[0] = tmp;
   }
   b2Math.Random = function () {
      return Math.random() * 2 - 1;
   }
   b2Math.RandomRange = function (lo, hi) {
      if (lo === undefined) lo = 0;
      if (hi === undefined) hi = 0;
      var r = Math.random();
      r = (hi - lo) * r + lo;
      return r;
   }
   b2Math.NextPowerOfTwo = function (x) {
      if (x === undefined) x = 0;
      x |= (x >> 1) & 0x7FFFFFFF;
      x |= (x >> 2) & 0x3FFFFFFF;
      x |= (x >> 4) & 0x0FFFFFFF;
      x |= (x >> 8) & 0x00FFFFFF;
      x |= (x >> 16) & 0x0000FFFF;
      return x + 1;
   }
   b2Math.IsPowerOfTwo = function (x) {
      if (x === undefined) x = 0;
      var result = x > 0 && (x & (x - 1)) == 0;
      return result;
   }
   Box2D.postDefs.push(function () {
      Box2D.Common.Math.b2Math.b2Vec2_zero = new b2Vec2(0.0, 0.0);
      Box2D.Common.Math.b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1.0, 0.0), new b2Vec2(0.0, 1.0));
      Box2D.Common.Math.b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity);
   });
   b2Sweep.b2Sweep = function () {
      this.localCenter = new b2Vec2();
      this.c0 = new b2Vec2;
      this.c = new b2Vec2();
   };
   b2Sweep.prototype.Set = function (other) {
      this.localCenter.SetV(other.localCenter);
      this.c0.SetV(other.c0);
      this.c.SetV(other.c);
      this.a0 = other.a0;
      this.a = other.a;
      this.t0 = other.t0;
   }
   b2Sweep.prototype.Copy = function () {
      var copy = new b2Sweep();
      copy.localCenter.SetV(this.localCenter);
      copy.c0.SetV(this.c0);
      copy.c.SetV(this.c);
      copy.a0 = this.a0;
      copy.a = this.a;
      copy.t0 = this.t0;
      return copy;
   }
   b2Sweep.prototype.GetTransform = function (xf, alpha) {
      if (alpha === undefined) alpha = 0;
      xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
      xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
      var angle = (1.0 - alpha) * this.a0 + alpha * this.a;
      xf.R.Set(angle);
      var tMat = xf.R;
      xf.position.x -= (tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y);
      xf.position.y -= (tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y);
   }
   b2Sweep.prototype.Advance = function (t) {
      if (t === undefined) t = 0;
      if (this.t0 < t && 1.0 - this.t0 > Number.MIN_VALUE) {
         var alpha = (t - this.t0) / (1.0 - this.t0);
         this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
         this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
         this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
         this.t0 = t;
      }
   }
   b2Transform.b2Transform = function () {
      this.position = new b2Vec2;
      this.R = new b2Mat22();
   };
   b2Transform.prototype.b2Transform = function (pos, r) {
      if (pos === undefined) pos = null;
      if (r === undefined) r = null;
      if (pos) {
         this.position.SetV(pos);
         this.R.SetM(r);
      }
   }
   b2Transform.prototype.Initialize = function (pos, r) {
      this.position.SetV(pos);
      this.R.SetM(r);
   }
   b2Transform.prototype.SetIdentity = function () {
      this.position.SetZero();
      this.R.SetIdentity();
   }
   b2Transform.prototype.Set = function (x) {
      this.position.SetV(x.position);
      this.R.SetM(x.R);
   }
   b2Transform.prototype.GetAngle = function () {
      return Math.atan2(this.R.col1.y, this.R.col1.x);
   }
   b2Vec2.b2Vec2 = function () {};
   b2Vec2.prototype.b2Vec2 = function (x_, y_) {
      if (x_ === undefined) x_ = 0;
      if (y_ === undefined) y_ = 0;
      this.x = x_;
      this.y = y_;
   }
   b2Vec2.prototype.SetZero = function () {
      this.x = 0.0;
      this.y = 0.0;
   }
   b2Vec2.prototype.Set = function (x_, y_) {
      if (x_ === undefined) x_ = 0;
      if (y_ === undefined) y_ = 0;
      this.x = x_;
      this.y = y_;
   }
   b2Vec2.prototype.SetV = function (v) {
      this.x = v.x;
      this.y = v.y;
   }
   b2Vec2.prototype.GetNegative = function () {
      return new b2Vec2((-this.x), (-this.y));
   }
   b2Vec2.prototype.NegativeSelf = function () {
      this.x = (-this.x);
      this.y = (-this.y);
   }
   b2Vec2.Make = function (x_, y_) {
      if (x_ === undefined) x_ = 0;
      if (y_ === undefined) y_ = 0;
      return new b2Vec2(x_, y_);
   }
   b2Vec2.prototype.Copy = function () {
      return new b2Vec2(this.x, this.y);
   }
   b2Vec2.prototype.Add = function (v) {
      this.x += v.x;
      this.y += v.y;
   }
   b2Vec2.prototype.Subtract = function (v) {
      this.x -= v.x;
      this.y -= v.y;
   }
   b2Vec2.prototype.Multiply = function (a) {
      if (a === undefined) a = 0;
      this.x *= a;
      this.y *= a;
   }
   b2Vec2.prototype.MulM = function (A) {
      var tX = this.x;
      this.x = A.col1.x * tX + A.col2.x * this.y;
      this.y = A.col1.y * tX + A.col2.y * this.y;
   }
   b2Vec2.prototype.MulTM = function (A) {
      var tX = b2Math.Dot(this, A.col1);
      this.y = b2Math.Dot(this, A.col2);
      this.x = tX;
   }
   b2Vec2.prototype.CrossVF = function (s) {
      if (s === undefined) s = 0;
      var tX = this.x;
      this.x = s * this.y;
      this.y = (-s * tX);
   }
   b2Vec2.prototype.CrossFV = function (s) {
      if (s === undefined) s = 0;
      var tX = this.x;
      this.x = (-s * this.y);
      this.y = s * tX;
   }
   b2Vec2.prototype.MinV = function (b) {
      this.x = this.x < b.x ? this.x : b.x;
      this.y = this.y < b.y ? this.y : b.y;
   }
   b2Vec2.prototype.MaxV = function (b) {
      this.x = this.x > b.x ? this.x : b.x;
      this.y = this.y > b.y ? this.y : b.y;
   }
   b2Vec2.prototype.Abs = function () {
      if (this.x < 0) this.x = (-this.x);
      if (this.y < 0) this.y = (-this.y);
   }
   b2Vec2.prototype.Length = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
   }
   b2Vec2.prototype.LengthSquared = function () {
      return (this.x * this.x + this.y * this.y);
   }
   b2Vec2.prototype.Normalize = function () {
      var length = Math.sqrt(this.x * this.x + this.y * this.y);
      if (length < Number.MIN_VALUE) {
         return 0.0;
      }
      var invLength = 1.0 / length;
      this.x *= invLength;
      this.y *= invLength;
      return length;
   }
   b2Vec2.prototype.IsValid = function () {
      return b2Math.IsValid(this.x) && b2Math.IsValid(this.y);
   }
   b2Vec3.b2Vec3 = function () {};
   b2Vec3.prototype.b2Vec3 = function (x, y, z) {
      if (x === undefined) x = 0;
      if (y === undefined) y = 0;
      if (z === undefined) z = 0;
      this.x = x;
      this.y = y;
      this.z = z;
   }
   b2Vec3.prototype.SetZero = function () {
      this.x = this.y = this.z = 0.0;
   }
   b2Vec3.prototype.Set = function (x, y, z) {
      if (x === undefined) x = 0;
      if (y === undefined) y = 0;
      if (z === undefined) z = 0;
      this.x = x;
      this.y = y;
      this.z = z;
   }
   b2Vec3.prototype.SetV = function (v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
   }
   b2Vec3.prototype.GetNegative = function () {
      return new b2Vec3((-this.x), (-this.y), (-this.z));
   }
   b2Vec3.prototype.NegativeSelf = function () {
      this.x = (-this.x);
      this.y = (-this.y);
      this.z = (-this.z);
   }
   b2Vec3.prototype.Copy = function () {
      return new b2Vec3(this.x, this.y, this.z);
   }
   b2Vec3.prototype.Add = function (v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
   }
   b2Vec3.prototype.Subtract = function (v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
   }
   b2Vec3.prototype.Multiply = function (a) {
      if (a === undefined) a = 0;
      this.x *= a;
      this.y *= a;
      this.z *= a;
   }
})();
(function () {
   var b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2AABB = Box2D.Collision.b2AABB,
      b2Bound = Box2D.Collision.b2Bound,
      b2BoundValues = Box2D.Collision.b2BoundValues,
      b2Collision = Box2D.Collision.b2Collision,
      b2ContactID = Box2D.Collision.b2ContactID,
      b2ContactPoint = Box2D.Collision.b2ContactPoint,
      b2Distance = Box2D.Collision.b2Distance,
      b2DistanceInput = Box2D.Collision.b2DistanceInput,
      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
      b2DynamicTree = Box2D.Collision.b2DynamicTree,
      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
      b2Manifold = Box2D.Collision.b2Manifold,
      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
      b2Point = Box2D.Collision.b2Point,
      b2RayCastInput = Box2D.Collision.b2RayCastInput,
      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
      b2Segment = Box2D.Collision.b2Segment,
      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
      b2Simplex = Box2D.Collision.b2Simplex,
      b2SimplexCache = Box2D.Collision.b2SimplexCache,
      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
      b2TOIInput = Box2D.Collision.b2TOIInput,
      b2WorldManifold = Box2D.Collision.b2WorldManifold,
      ClipVertex = Box2D.Collision.ClipVertex,
      Features = Box2D.Collision.Features,
      IBroadPhase = Box2D.Collision.IBroadPhase,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
      b2Contact = Box2D.Dynamics.Contacts.b2Contact,
      b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
      b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
      b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
      b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
      b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
      b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
      b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
      b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
      b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
      b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
      b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
      b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
      b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
      b2Joint = Box2D.Dynamics.Joints.b2Joint,
      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

   b2Body.b2Body = function () {
      this.m_xf = new b2Transform();
      this.m_sweep = new b2Sweep();
      this.m_linearVelocity = new b2Vec2();
      this.m_force = new b2Vec2();
   };
   b2Body.prototype.connectEdges = function (s1, s2, angle1) {
      if (angle1 === undefined) angle1 = 0;
      var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
      var coreOffset = Math.tan((angle2 - angle1) * 0.5);
      var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
      core = b2Math.SubtractVV(core, s2.GetNormalVector());
      core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
      core = b2Math.AddVV(core, s2.GetVertex1());
      var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
      cornerDir.Normalize();
      var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0.0;
      s1.SetNextEdge(s2, core, cornerDir, convex);
      s2.SetPrevEdge(s1, core, cornerDir, convex);
      return angle2;
   }
   b2Body.prototype.CreateFixture = function (def) {
      if (this.m_world.IsLocked() == true) {
         return null;
      }
      var fixture = new b2Fixture();
      fixture.Create(this, this.m_xf, def);
      if (this.m_flags & b2Body.e_activeFlag) {
         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
         fixture.CreateProxy(broadPhase, this.m_xf);
      }
      fixture.m_next = this.m_fixtureList;
      this.m_fixtureList = fixture;
      ++this.m_fixtureCount;
      fixture.m_body = this;
      if (fixture.m_density > 0.0) {
         this.ResetMassData();
      }
      this.m_world.m_flags |= b2World.e_newFixture;
      return fixture;
   }
   b2Body.prototype.CreateFixture2 = function (shape, density) {
      if (density === undefined) density = 0.0;
      var def = new b2FixtureDef();
      def.shape = shape;
      def.density = density;
      return this.CreateFixture(def);
   }
   b2Body.prototype.DestroyFixture = function (fixture) {
      if (this.m_world.IsLocked() == true) {
         return;
      }
      var node = this.m_fixtureList;
      var ppF = null;
      var found = false;
      while (node != null) {
         if (node == fixture) {
            if (ppF) ppF.m_next = fixture.m_next;
            else this.m_fixtureList = fixture.m_next;
            found = true;
            break;
         }
         ppF = node;
         node = node.m_next;
      }
      var edge = this.m_contactList;
      while (edge) {
         var c = edge.contact;
         edge = edge.next;
         var fixtureA = c.GetFixtureA();
         var fixtureB = c.GetFixtureB();
         if (fixture == fixtureA || fixture == fixtureB) {
            this.m_world.m_contactManager.Destroy(c);
         }
      }
      if (this.m_flags & b2Body.e_activeFlag) {
         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
         fixture.DestroyProxy(broadPhase);
      }
      else {}
      fixture.Destroy();
      fixture.m_body = null;
      fixture.m_next = null;
      --this.m_fixtureCount;
      this.ResetMassData();
   }
   b2Body.prototype.SetPositionAndAngle = function (position, angle) {
      if (angle === undefined) angle = 0;
      var f;
      if (this.m_world.IsLocked() == true) {
         return;
      }
      this.m_xf.R.Set(angle);
      this.m_xf.position.SetV(position);
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_sweep.a0 = this.m_sweep.a = angle;
      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
      for (f = this.m_fixtureList;
      f; f = f.m_next) {
         f.Synchronize(broadPhase, this.m_xf, this.m_xf);
      }
      this.m_world.m_contactManager.FindNewContacts();
   }
   b2Body.prototype.SetTransform = function (xf) {
      this.SetPositionAndAngle(xf.position, xf.GetAngle());
   }
   b2Body.prototype.GetTransform = function () {
      return this.m_xf;
   }
   b2Body.prototype.GetPosition = function () {
      return this.m_xf.position;
   }
   b2Body.prototype.SetPosition = function (position) {
      this.SetPositionAndAngle(position, this.GetAngle());
   }
   b2Body.prototype.GetAngle = function () {
      return this.m_sweep.a;
   }
   b2Body.prototype.SetAngle = function (angle) {
      if (angle === undefined) angle = 0;
      this.SetPositionAndAngle(this.GetPosition(), angle);
   }
   b2Body.prototype.GetWorldCenter = function () {
      return this.m_sweep.c;
   }
   b2Body.prototype.GetLocalCenter = function () {
      return this.m_sweep.localCenter;
   }
   b2Body.prototype.SetLinearVelocity = function (v) {
      if (this.m_type == b2Body.b2_staticBody) {
         return;
      }
      this.m_linearVelocity.SetV(v);
   }
   b2Body.prototype.GetLinearVelocity = function () {
      return this.m_linearVelocity;
   }
   b2Body.prototype.SetAngularVelocity = function (omega) {
      if (omega === undefined) omega = 0;
      if (this.m_type == b2Body.b2_staticBody) {
         return;
      }
      this.m_angularVelocity = omega;
   }
   b2Body.prototype.GetAngularVelocity = function () {
      return this.m_angularVelocity;
   }
   b2Body.prototype.GetDefinition = function () {
      var bd = new b2BodyDef();
      bd.type = this.GetType();
      bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
      bd.angle = this.GetAngle();
      bd.angularDamping = this.m_angularDamping;
      bd.angularVelocity = this.m_angularVelocity;
      bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
      bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
      bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
      bd.linearDamping = this.m_linearDamping;
      bd.linearVelocity.SetV(this.GetLinearVelocity());
      bd.position = this.GetPosition();
      bd.userData = this.GetUserData();
      return bd;
   }
   b2Body.prototype.ApplyForce = function (force, point) {
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_force.x += force.x;
      this.m_force.y += force.y;
      this.m_torque += ((point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x);
   }
   b2Body.prototype.ApplyTorque = function (torque) {
      if (torque === undefined) torque = 0;
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_torque += torque;
   }
   b2Body.prototype.ApplyImpulse = function (impulse, point) {
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      if (this.IsAwake() == false) {
         this.SetAwake(true);
      }
      this.m_linearVelocity.x += this.m_invMass * impulse.x;
      this.m_linearVelocity.y += this.m_invMass * impulse.y;
      this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
   }
   b2Body.prototype.Split = function (callback) {
      var linearVelocity = this.GetLinearVelocity().Copy();
      var angularVelocity = this.GetAngularVelocity();
      var center = this.GetWorldCenter();
      var body1 = this;
      var body2 = this.m_world.CreateBody(this.GetDefinition());
      var prev;
      for (var f = body1.m_fixtureList; f;) {
         if (callback(f)) {
            var next = f.m_next;
            if (prev) {
               prev.m_next = next;
            }
            else {
               body1.m_fixtureList = next;
            }
            body1.m_fixtureCount--;
            f.m_next = body2.m_fixtureList;
            body2.m_fixtureList = f;
            body2.m_fixtureCount++;
            f.m_body = body2;
            f = next;
         }
         else {
            prev = f;
            f = f.m_next;
         }
      }
      body1.ResetMassData();
      body2.ResetMassData();
      var center1 = body1.GetWorldCenter();
      var center2 = body2.GetWorldCenter();
      var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
      var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
      body1.SetLinearVelocity(velocity1);
      body2.SetLinearVelocity(velocity2);
      body1.SetAngularVelocity(angularVelocity);
      body2.SetAngularVelocity(angularVelocity);
      body1.SynchronizeFixtures();
      body2.SynchronizeFixtures();
      return body2;
   }
   b2Body.prototype.Merge = function (other) {
      var f;
      for (f = other.m_fixtureList;
      f;) {
         var next = f.m_next;
         other.m_fixtureCount--;
         f.m_next = this.m_fixtureList;
         this.m_fixtureList = f;
         this.m_fixtureCount++;
         f.m_body = body2;
         f = next;
      }
      body1.m_fixtureCount = 0;
      var body1 = this;
      var body2 = other;
      var center1 = body1.GetWorldCenter();
      var center2 = body2.GetWorldCenter();
      var velocity1 = body1.GetLinearVelocity().Copy();
      var velocity2 = body2.GetLinearVelocity().Copy();
      var angular1 = body1.GetAngularVelocity();
      var angular = body2.GetAngularVelocity();
      body1.ResetMassData();
      this.SynchronizeFixtures();
   }
   b2Body.prototype.GetMass = function () {
      return this.m_mass;
   }
   b2Body.prototype.GetInertia = function () {
      return this.m_I;
   }
   b2Body.prototype.GetMassData = function (data) {
      data.mass = this.m_mass;
      data.I = this.m_I;
      data.center.SetV(this.m_sweep.localCenter);
   }
   b2Body.prototype.SetMassData = function (massData) {
      b2Settings.b2Assert(this.m_world.IsLocked() == false);
      if (this.m_world.IsLocked() == true) {
         return;
      }
      if (this.m_type != b2Body.b2_dynamicBody) {
         return;
      }
      this.m_invMass = 0.0;
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_mass = massData.mass;
      if (this.m_mass <= 0.0) {
         this.m_mass = 1.0;
      }
      this.m_invMass = 1.0 / this.m_mass;
      if (massData.I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
         this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
         this.m_invI = 1.0 / this.m_I;
      }
      var oldCenter = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(massData.center);
      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
   }
   b2Body.prototype.ResetMassData = function () {
      this.m_mass = 0.0;
      this.m_invMass = 0.0;
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_sweep.localCenter.SetZero();
      if (this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
         return;
      }
      var center = b2Vec2.Make(0, 0);
      for (var f = this.m_fixtureList; f; f = f.m_next) {
         if (f.m_density == 0.0) {
            continue;
         }
         var massData = f.GetMassData();
         this.m_mass += massData.mass;
         center.x += massData.center.x * massData.mass;
         center.y += massData.center.y * massData.mass;
         this.m_I += massData.I;
      }
      if (this.m_mass > 0.0) {
         this.m_invMass = 1.0 / this.m_mass;
         center.x *= this.m_invMass;
         center.y *= this.m_invMass;
      }
      else {
         this.m_mass = 1.0;
         this.m_invMass = 1.0;
      }
      if (this.m_I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
         this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
         this.m_I *= this.m_inertiaScale;
         b2Settings.b2Assert(this.m_I > 0);
         this.m_invI = 1.0 / this.m_I;
      }
      else {
         this.m_I = 0.0;
         this.m_invI = 0.0;
      }
      var oldCenter = this.m_sweep.c.Copy();
      this.m_sweep.localCenter.SetV(center);
      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
   }
   b2Body.prototype.GetWorldPoint = function (localPoint) {
      var A = this.m_xf.R;
      var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
      u.x += this.m_xf.position.x;
      u.y += this.m_xf.position.y;
      return u;
   }
   b2Body.prototype.GetWorldVector = function (localVector) {
      return b2Math.MulMV(this.m_xf.R, localVector);
   }
   b2Body.prototype.GetLocalPoint = function (worldPoint) {
      return b2Math.MulXT(this.m_xf, worldPoint);
   }
   b2Body.prototype.GetLocalVector = function (worldVector) {
      return b2Math.MulTMV(this.m_xf.R, worldVector);
   }
   b2Body.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint) {
      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
   }
   b2Body.prototype.GetLinearVelocityFromLocalPoint = function (localPoint) {
      var A = this.m_xf.R;
      var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
      worldPoint.x += this.m_xf.position.x;
      worldPoint.y += this.m_xf.position.y;
      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
   }
   b2Body.prototype.GetLinearDamping = function () {
      return this.m_linearDamping;
   }
   b2Body.prototype.SetLinearDamping = function (linearDamping) {
      if (linearDamping === undefined) linearDamping = 0;
      this.m_linearDamping = linearDamping;
   }
   b2Body.prototype.GetAngularDamping = function () {
      return this.m_angularDamping;
   }
   b2Body.prototype.SetAngularDamping = function (angularDamping) {
      if (angularDamping === undefined) angularDamping = 0;
      this.m_angularDamping = angularDamping;
   }
   b2Body.prototype.SetType = function (type) {
      if (type === undefined) type = 0;
      if (this.m_type == type) {
         return;
      }
      this.m_type = type;
      this.ResetMassData();
      if (this.m_type == b2Body.b2_staticBody) {
         this.m_linearVelocity.SetZero();
         this.m_angularVelocity = 0.0;
      }
      this.SetAwake(true);
      this.m_force.SetZero();
      this.m_torque = 0.0;
      for (var ce = this.m_contactList; ce; ce = ce.next) {
         ce.contact.FlagForFiltering();
      }
   }
   b2Body.prototype.GetType = function () {
      return this.m_type;
   }
   b2Body.prototype.SetBullet = function (flag) {
      if (flag) {
         this.m_flags |= b2Body.e_bulletFlag;
      }
      else {
         this.m_flags &= ~b2Body.e_bulletFlag;
      }
   }
   b2Body.prototype.IsBullet = function () {
      return (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
   }
   b2Body.prototype.SetSleepingAllowed = function (flag) {
      if (flag) {
         this.m_flags |= b2Body.e_allowSleepFlag;
      }
      else {
         this.m_flags &= ~b2Body.e_allowSleepFlag;
         this.SetAwake(true);
      }
   }
   b2Body.prototype.SetAwake = function (flag) {
      if (flag) {
         this.m_flags |= b2Body.e_awakeFlag;
         this.m_sleepTime = 0.0;
      }
      else {
         this.m_flags &= ~b2Body.e_awakeFlag;
         this.m_sleepTime = 0.0;
         this.m_linearVelocity.SetZero();
         this.m_angularVelocity = 0.0;
         this.m_force.SetZero();
         this.m_torque = 0.0;
      }
   }
   b2Body.prototype.IsAwake = function () {
      return (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
   }
   b2Body.prototype.SetFixedRotation = function (fixed) {
      if (fixed) {
         this.m_flags |= b2Body.e_fixedRotationFlag;
      }
      else {
         this.m_flags &= ~b2Body.e_fixedRotationFlag;
      }
      this.ResetMassData();
   }
   b2Body.prototype.IsFixedRotation = function () {
      return (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
   }
   b2Body.prototype.SetActive = function (flag) {
      if (flag == this.IsActive()) {
         return;
      }
      var broadPhase;
      var f;
      if (flag) {
         this.m_flags |= b2Body.e_activeFlag;
         broadPhase = this.m_world.m_contactManager.m_broadPhase;
         for (f = this.m_fixtureList;
         f; f = f.m_next) {
            f.CreateProxy(broadPhase, this.m_xf);
         }
      }
      else {
         this.m_flags &= ~b2Body.e_activeFlag;
         broadPhase = this.m_world.m_contactManager.m_broadPhase;
         for (f = this.m_fixtureList;
         f; f = f.m_next) {
            f.DestroyProxy(broadPhase);
         }
         var ce = this.m_contactList;
         while (ce) {
            var ce0 = ce;
            ce = ce.next;
            this.m_world.m_contactManager.Destroy(ce0.contact);
         }
         this.m_contactList = null;
      }
   }
   b2Body.prototype.IsActive = function () {
      return (this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag;
   }
   b2Body.prototype.IsSleepingAllowed = function () {
      return (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
   }
   b2Body.prototype.GetFixtureList = function () {
      return this.m_fixtureList;
   }
   b2Body.prototype.GetJointList = function () {
      return this.m_jointList;
   }
   b2Body.prototype.GetControllerList = function () {
      return this.m_controllerList;
   }
   b2Body.prototype.GetContactList = function () {
      return this.m_contactList;
   }
   b2Body.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Body.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Body.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Body.prototype.GetWorld = function () {
      return this.m_world;
   }
   b2Body.prototype.b2Body = function (bd, world) {
      this.m_flags = 0;
      if (bd.bullet) {
         this.m_flags |= b2Body.e_bulletFlag;
      }
      if (bd.fixedRotation) {
         this.m_flags |= b2Body.e_fixedRotationFlag;
      }
      if (bd.allowSleep) {
         this.m_flags |= b2Body.e_allowSleepFlag;
      }
      if (bd.awake) {
         this.m_flags |= b2Body.e_awakeFlag;
      }
      if (bd.active) {
         this.m_flags |= b2Body.e_activeFlag;
      }
      this.m_world = world;
      this.m_xf.position.SetV(bd.position);
      this.m_xf.R.Set(bd.angle);
      this.m_sweep.localCenter.SetZero();
      this.m_sweep.t0 = 1.0;
      this.m_sweep.a0 = this.m_sweep.a = bd.angle;
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      this.m_sweep.c.x += this.m_xf.position.x;
      this.m_sweep.c.y += this.m_xf.position.y;
      this.m_sweep.c0.SetV(this.m_sweep.c);
      this.m_jointList = null;
      this.m_controllerList = null;
      this.m_contactList = null;
      this.m_controllerCount = 0;
      this.m_prev = null;
      this.m_next = null;
      this.m_linearVelocity.SetV(bd.linearVelocity);
      this.m_angularVelocity = bd.angularVelocity;
      this.m_linearDamping = bd.linearDamping;
      this.m_angularDamping = bd.angularDamping;
      this.m_force.Set(0.0, 0.0);
      this.m_torque = 0.0;
      this.m_sleepTime = 0.0;
      this.m_type = bd.type;
      if (this.m_type == b2Body.b2_dynamicBody) {
         this.m_mass = 1.0;
         this.m_invMass = 1.0;
      }
      else {
         this.m_mass = 0.0;
         this.m_invMass = 0.0;
      }
      this.m_I = 0.0;
      this.m_invI = 0.0;
      this.m_inertiaScale = bd.inertiaScale;
      this.m_userData = bd.userData;
      this.m_fixtureList = null;
      this.m_fixtureCount = 0;
   }
   b2Body.prototype.SynchronizeFixtures = function () {
      var xf1 = b2Body.s_xf1;
      xf1.R.Set(this.m_sweep.a0);
      var tMat = xf1.R;
      var tVec = this.m_sweep.localCenter;
      xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var f;
      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
      for (f = this.m_fixtureList;
      f; f = f.m_next) {
         f.Synchronize(broadPhase, xf1, this.m_xf);
      }
   }
   b2Body.prototype.SynchronizeTransform = function () {
      this.m_xf.R.Set(this.m_sweep.a);
      var tMat = this.m_xf.R;
      var tVec = this.m_sweep.localCenter;
      this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
   }
   b2Body.prototype.ShouldCollide = function (other) {
      if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
         return false;
      }
      for (var jn = this.m_jointList; jn; jn = jn.next) {
         if (jn.other == other) if (jn.joint.m_collideConnected == false) {
            return false;
         }
      }
      return true;
   }
   b2Body.prototype.Advance = function (t) {
      if (t === undefined) t = 0;
      this.m_sweep.Advance(t);
      this.m_sweep.c.SetV(this.m_sweep.c0);
      this.m_sweep.a = this.m_sweep.a0;
      this.SynchronizeTransform();
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2Body.s_xf1 = new b2Transform();
      Box2D.Dynamics.b2Body.e_islandFlag = 0x0001;
      Box2D.Dynamics.b2Body.e_awakeFlag = 0x0002;
      Box2D.Dynamics.b2Body.e_allowSleepFlag = 0x0004;
      Box2D.Dynamics.b2Body.e_bulletFlag = 0x0008;
      Box2D.Dynamics.b2Body.e_fixedRotationFlag = 0x0010;
      Box2D.Dynamics.b2Body.e_activeFlag = 0x0020;
      Box2D.Dynamics.b2Body.b2_staticBody = 0;
      Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
      Box2D.Dynamics.b2Body.b2_dynamicBody = 2;
   });
   b2BodyDef.b2BodyDef = function () {
      this.position = new b2Vec2();
      this.linearVelocity = new b2Vec2();
   };
   b2BodyDef.prototype.b2BodyDef = function () {
      this.userData = null;
      this.position.Set(0.0, 0.0);
      this.angle = 0.0;
      this.linearVelocity.Set(0, 0);
      this.angularVelocity = 0.0;
      this.linearDamping = 0.0;
      this.angularDamping = 0.0;
      this.allowSleep = true;
      this.awake = true;
      this.fixedRotation = false;
      this.bullet = false;
      this.type = b2Body.b2_staticBody;
      this.active = true;
      this.inertiaScale = 1.0;
   }
   b2ContactFilter.b2ContactFilter = function () {};
   b2ContactFilter.prototype.ShouldCollide = function (fixtureA, fixtureB) {
      var filter1 = fixtureA.GetFilterData();
      var filter2 = fixtureB.GetFilterData();
      if (filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
         return filter1.groupIndex > 0;
      }
      var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
      return collide;
   }
   b2ContactFilter.prototype.RayCollide = function (userData, fixture) {
      if (!userData) return true;
      return this.ShouldCollide((userData instanceof b2Fixture ? userData : null), fixture);
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
   });
   b2ContactImpulse.b2ContactImpulse = function () {
      this.normalImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
      this.tangentImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
   };
   b2ContactListener.b2ContactListener = function () {};
   b2ContactListener.prototype.BeginContact = function (contact) {}
   b2ContactListener.prototype.EndContact = function (contact) {}
   b2ContactListener.prototype.PreSolve = function (contact, oldManifold) {}
   b2ContactListener.prototype.PostSolve = function (contact, impulse) {}
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2ContactListener.b2_defaultListener = new b2ContactListener();
   });
   b2ContactManager.b2ContactManager = function () {};
   b2ContactManager.prototype.b2ContactManager = function () {
      this.m_world = null;
      this.m_contactCount = 0;
      this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
      this.m_contactListener = b2ContactListener.b2_defaultListener;
      this.m_contactFactory = new b2ContactFactory(this.m_allocator);
      this.m_broadPhase = new b2DynamicTreeBroadPhase();
   }
   b2ContactManager.prototype.AddPair = function (proxyUserDataA, proxyUserDataB) {
      var fixtureA = (proxyUserDataA instanceof b2Fixture ? proxyUserDataA : null);
      var fixtureB = (proxyUserDataB instanceof b2Fixture ? proxyUserDataB : null);
      var bodyA = fixtureA.GetBody();
      var bodyB = fixtureB.GetBody();
      if (bodyA == bodyB) return;
      var edge = bodyB.GetContactList();
      while (edge) {
         if (edge.other == bodyA) {
            var fA = edge.contact.GetFixtureA();
            var fB = edge.contact.GetFixtureB();
            if (fA == fixtureA && fB == fixtureB) return;
            if (fA == fixtureB && fB == fixtureA) return;
         }
         edge = edge.next;
      }
      if (bodyB.ShouldCollide(bodyA) == false) {
         return;
      }
      if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
         return;
      }
      var c = this.m_contactFactory.Create(fixtureA, fixtureB);
      fixtureA = c.GetFixtureA();
      fixtureB = c.GetFixtureB();
      bodyA = fixtureA.m_body;
      bodyB = fixtureB.m_body;
      c.m_prev = null;
      c.m_next = this.m_world.m_contactList;
      if (this.m_world.m_contactList != null) {
         this.m_world.m_contactList.m_prev = c;
      }
      this.m_world.m_contactList = c;
      c.m_nodeA.contact = c;
      c.m_nodeA.other = bodyB;
      c.m_nodeA.prev = null;
      c.m_nodeA.next = bodyA.m_contactList;
      if (bodyA.m_contactList != null) {
         bodyA.m_contactList.prev = c.m_nodeA;
      }
      bodyA.m_contactList = c.m_nodeA;
      c.m_nodeB.contact = c;
      c.m_nodeB.other = bodyA;
      c.m_nodeB.prev = null;
      c.m_nodeB.next = bodyB.m_contactList;
      if (bodyB.m_contactList != null) {
         bodyB.m_contactList.prev = c.m_nodeB;
      }
      bodyB.m_contactList = c.m_nodeB;
      ++this.m_world.m_contactCount;
      return;
   }
   b2ContactManager.prototype.FindNewContacts = function () {
      this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair));
   }
   b2ContactManager.prototype.Destroy = function (c) {
      var fixtureA = c.GetFixtureA();
      var fixtureB = c.GetFixtureB();
      var bodyA = fixtureA.GetBody();
      var bodyB = fixtureB.GetBody();
      if (c.IsTouching()) {
         this.m_contactListener.EndContact(c);
      }
      if (c.m_prev) {
         c.m_prev.m_next = c.m_next;
      }
      if (c.m_next) {
         c.m_next.m_prev = c.m_prev;
      }
      if (c == this.m_world.m_contactList) {
         this.m_world.m_contactList = c.m_next;
      }
      if (c.m_nodeA.prev) {
         c.m_nodeA.prev.next = c.m_nodeA.next;
      }
      if (c.m_nodeA.next) {
         c.m_nodeA.next.prev = c.m_nodeA.prev;
      }
      if (c.m_nodeA == bodyA.m_contactList) {
         bodyA.m_contactList = c.m_nodeA.next;
      }
      if (c.m_nodeB.prev) {
         c.m_nodeB.prev.next = c.m_nodeB.next;
      }
      if (c.m_nodeB.next) {
         c.m_nodeB.next.prev = c.m_nodeB.prev;
      }
      if (c.m_nodeB == bodyB.m_contactList) {
         bodyB.m_contactList = c.m_nodeB.next;
      }
      this.m_contactFactory.Destroy(c);
      --this.m_contactCount;
   }
   b2ContactManager.prototype.Collide = function () {
      var c = this.m_world.m_contactList;
      while (c) {
         var fixtureA = c.GetFixtureA();
         var fixtureB = c.GetFixtureB();
         var bodyA = fixtureA.GetBody();
         var bodyB = fixtureB.GetBody();
         if (bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
            c = c.GetNext();
            continue;
         }
         if (c.m_flags & b2Contact.e_filterFlag) {
            if (bodyB.ShouldCollide(bodyA) == false) {
               var cNuke = c;
               c = cNuke.GetNext();
               this.Destroy(cNuke);
               continue;
            }
            if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
               cNuke = c;
               c = cNuke.GetNext();
               this.Destroy(cNuke);
               continue;
            }
            c.m_flags &= ~b2Contact.e_filterFlag;
         }
         var proxyA = fixtureA.m_proxy;
         var proxyB = fixtureB.m_proxy;
         var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
         if (overlap == false) {
            cNuke = c;
            c = cNuke.GetNext();
            this.Destroy(cNuke);
            continue;
         }
         c.Update(this.m_contactListener);
         c = c.GetNext();
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2ContactManager.s_evalCP = new b2ContactPoint();
   });
   b2DebugDraw.b2DebugDraw = function () {};
   b2DebugDraw.prototype.b2DebugDraw = function () {}
   b2DebugDraw.prototype.SetFlags = function (flags) {
      if (flags === undefined) flags = 0;
   }
   b2DebugDraw.prototype.GetFlags = function () {}
   b2DebugDraw.prototype.AppendFlags = function (flags) {
      if (flags === undefined) flags = 0;
   }
   b2DebugDraw.prototype.ClearFlags = function (flags) {
      if (flags === undefined) flags = 0;
   }
   b2DebugDraw.prototype.SetSprite = function (sprite) {}
   b2DebugDraw.prototype.GetSprite = function () {}
   b2DebugDraw.prototype.SetDrawScale = function (drawScale) {
      if (drawScale === undefined) drawScale = 0;
   }
   b2DebugDraw.prototype.GetDrawScale = function () {}
   b2DebugDraw.prototype.SetLineThickness = function (lineThickness) {
      if (lineThickness === undefined) lineThickness = 0;
   }
   b2DebugDraw.prototype.GetLineThickness = function () {}
   b2DebugDraw.prototype.SetAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
   }
   b2DebugDraw.prototype.GetAlpha = function () {}
   b2DebugDraw.prototype.SetFillAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
   }
   b2DebugDraw.prototype.GetFillAlpha = function () {}
   b2DebugDraw.prototype.SetXFormScale = function (xformScale) {
      if (xformScale === undefined) xformScale = 0;
   }
   b2DebugDraw.prototype.GetXFormScale = function () {}
   b2DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
      if (vertexCount === undefined) vertexCount = 0;
   }
   b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
      if (vertexCount === undefined) vertexCount = 0;
   }
   b2DebugDraw.prototype.DrawCircle = function (center, radius, color) {
      if (radius === undefined) radius = 0;
   }
   b2DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
      if (radius === undefined) radius = 0;
   }
   b2DebugDraw.prototype.DrawSegment = function (p1, p2, color) {}
   b2DebugDraw.prototype.DrawTransform = function (xf) {}
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2DebugDraw.e_shapeBit = 0x0001;
      Box2D.Dynamics.b2DebugDraw.e_jointBit = 0x0002;
      Box2D.Dynamics.b2DebugDraw.e_aabbBit = 0x0004;
      Box2D.Dynamics.b2DebugDraw.e_pairBit = 0x0008;
      Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 0x0010;
      Box2D.Dynamics.b2DebugDraw.e_controllerBit = 0x0020;
   });
   b2DestructionListener.b2DestructionListener = function () {};
   b2DestructionListener.prototype.SayGoodbyeJoint = function (joint) {}
   b2DestructionListener.prototype.SayGoodbyeFixture = function (fixture) {}
   b2FilterData.b2FilterData = function () {
      this.categoryBits = 0x0001;
      this.maskBits = 0xFFFF;
      this.groupIndex = 0;
   };
   b2FilterData.prototype.Copy = function () {
      var copy = new b2FilterData();
      copy.categoryBits = this.categoryBits;
      copy.maskBits = this.maskBits;
      copy.groupIndex = this.groupIndex;
      return copy;
   }
   b2Fixture.b2Fixture = function () {
      this.m_filter = new b2FilterData();
   };
   b2Fixture.prototype.GetType = function () {
      return this.m_shape.GetType();
   }
   b2Fixture.prototype.GetShape = function () {
      return this.m_shape;
   }
   b2Fixture.prototype.SetSensor = function (sensor) {
      if (this.m_isSensor == sensor) return;
      this.m_isSensor = sensor;
      if (this.m_body == null) return;
      var edge = this.m_body.GetContactList();
      while (edge) {
         var contact = edge.contact;
         var fixtureA = contact.GetFixtureA();
         var fixtureB = contact.GetFixtureB();
         if (fixtureA == this || fixtureB == this) contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
         edge = edge.next;
      }
   }
   b2Fixture.prototype.IsSensor = function () {
      return this.m_isSensor;
   }
   b2Fixture.prototype.SetFilterData = function (filter) {
      this.m_filter = filter.Copy();
      if (this.m_body) return;
      var edge = this.m_body.GetContactList();
      while (edge) {
         var contact = edge.contact;
         var fixtureA = contact.GetFixtureA();
         var fixtureB = contact.GetFixtureB();
         if (fixtureA == this || fixtureB == this) contact.FlagForFiltering();
         edge = edge.next;
      }
   }
   b2Fixture.prototype.GetFilterData = function () {
      return this.m_filter.Copy();
   }
   b2Fixture.prototype.GetBody = function () {
      return this.m_body;
   }
   b2Fixture.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Fixture.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Fixture.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Fixture.prototype.TestPoint = function (p) {
      return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
   }
   b2Fixture.prototype.RayCast = function (output, input) {
      return this.m_shape.RayCast(output, input, this.m_body.GetTransform());
   }
   b2Fixture.prototype.GetMassData = function (massData) {
      if (massData === undefined) massData = null;
      if (massData == null) {
         massData = new b2MassData();
      }
      this.m_shape.ComputeMass(massData, this.m_density);
      return massData;
   }
   b2Fixture.prototype.SetDensity = function (density) {
      if (density === undefined) density = 0;
      this.m_density = density;
   }
   b2Fixture.prototype.GetDensity = function () {
      return this.m_density;
   }
   b2Fixture.prototype.GetFriction = function () {
      return this.m_friction;
   }
   b2Fixture.prototype.SetFriction = function (friction) {
      if (friction === undefined) friction = 0;
      this.m_friction = friction;
   }
   b2Fixture.prototype.GetRestitution = function () {
      return this.m_restitution;
   }
   b2Fixture.prototype.SetRestitution = function (restitution) {
      if (restitution === undefined) restitution = 0;
      this.m_restitution = restitution;
   }
   b2Fixture.prototype.GetAABB = function () {
      return this.m_aabb;
   }
   b2Fixture.prototype.b2Fixture = function () {
      this.m_aabb = new b2AABB();
      this.m_userData = null;
      this.m_body = null;
      this.m_next = null;
      this.m_shape = null;
      this.m_density = 0.0;
      this.m_friction = 0.0;
      this.m_restitution = 0.0;
   }
   b2Fixture.prototype.Create = function (body, xf, def) {
      this.m_userData = def.userData;
      this.m_friction = def.friction;
      this.m_restitution = def.restitution;
      this.m_body = body;
      this.m_next = null;
      this.m_filter = def.filter.Copy();
      this.m_isSensor = def.isSensor;
      this.m_shape = def.shape.Copy();
      this.m_density = def.density;
   }
   b2Fixture.prototype.Destroy = function () {
      this.m_shape = null;
   }
   b2Fixture.prototype.CreateProxy = function (broadPhase, xf) {
      this.m_shape.ComputeAABB(this.m_aabb, xf);
      this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this);
   }
   b2Fixture.prototype.DestroyProxy = function (broadPhase) {
      if (this.m_proxy == null) {
         return;
      }
      broadPhase.DestroyProxy(this.m_proxy);
      this.m_proxy = null;
   }
   b2Fixture.prototype.Synchronize = function (broadPhase, transform1, transform2) {
      if (!this.m_proxy) return;
      var aabb1 = new b2AABB();
      var aabb2 = new b2AABB();
      this.m_shape.ComputeAABB(aabb1, transform1);
      this.m_shape.ComputeAABB(aabb2, transform2);
      this.m_aabb.Combine(aabb1, aabb2);
      var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
      broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement);
   }
   b2FixtureDef.b2FixtureDef = function () {
      this.filter = new b2FilterData();
   };
   b2FixtureDef.prototype.b2FixtureDef = function () {
      this.shape = null;
      this.userData = null;
      this.friction = 0.2;
      this.restitution = 0.0;
      this.density = 0.0;
      this.filter.categoryBits = 0x0001;
      this.filter.maskBits = 0xFFFF;
      this.filter.groupIndex = 0;
      this.isSensor = false;
   }
   b2Island.b2Island = function () {};
   b2Island.prototype.b2Island = function () {
      this.m_bodies = new Vector();
      this.m_contacts = new Vector();
      this.m_joints = new Vector();
   }
   b2Island.prototype.Initialize = function (bodyCapacity, contactCapacity, jointCapacity, allocator, listener, contactSolver) {
      if (bodyCapacity === undefined) bodyCapacity = 0;
      if (contactCapacity === undefined) contactCapacity = 0;
      if (jointCapacity === undefined) jointCapacity = 0;
      var i = 0;
      this.m_bodyCapacity = bodyCapacity;
      this.m_contactCapacity = contactCapacity;
      this.m_jointCapacity = jointCapacity;
      this.m_bodyCount = 0;
      this.m_contactCount = 0;
      this.m_jointCount = 0;
      this.m_allocator = allocator;
      this.m_listener = listener;
      this.m_contactSolver = contactSolver;
      for (i = this.m_bodies.length;
      i < bodyCapacity; i++)
      this.m_bodies[i] = null;
      for (i = this.m_contacts.length;
      i < contactCapacity; i++)
      this.m_contacts[i] = null;
      for (i = this.m_joints.length;
      i < jointCapacity; i++)
      this.m_joints[i] = null;
   }
   b2Island.prototype.Clear = function () {
      this.m_bodyCount = 0;
      this.m_contactCount = 0;
      this.m_jointCount = 0;
   }
   b2Island.prototype.Solve = function (step, gravity, allowSleep) {
      var i = 0;
      var j = 0;
      var b;
      var joint;
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         b = this.m_bodies[i];
         if (b.GetType() != b2Body.b2_dynamicBody) continue;
         b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
         b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
         b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
         b.m_linearVelocity.Multiply(b2Math.Clamp(1.0 - step.dt * b.m_linearDamping, 0.0, 1.0));
         b.m_angularVelocity *= b2Math.Clamp(1.0 - step.dt * b.m_angularDamping, 0.0, 1.0);
      }
      this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
      var contactSolver = this.m_contactSolver;
      contactSolver.InitVelocityConstraints(step);
      for (i = 0;
      i < this.m_jointCount; ++i) {
         joint = this.m_joints[i];
         joint.InitVelocityConstraints(step);
      }
      for (i = 0;
      i < step.velocityIterations; ++i) {
         for (j = 0;
         j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            joint.SolveVelocityConstraints(step);
         }
         contactSolver.SolveVelocityConstraints();
      }
      for (i = 0;
      i < this.m_jointCount; ++i) {
         joint = this.m_joints[i];
         joint.FinalizeVelocityConstraints();
      }
      contactSolver.FinalizeVelocityConstraints();
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         b = this.m_bodies[i];
         if (b.GetType() == b2Body.b2_staticBody) continue;
         var translationX = step.dt * b.m_linearVelocity.x;
         var translationY = step.dt * b.m_linearVelocity.y;
         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt;
         }
         var rotation = step.dt * b.m_angularVelocity;
         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
               b.m_angularVelocity = (-b2Settings.b2_maxRotation * step.inv_dt);
            }
            else {
               b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt;
            }
         }
         b.m_sweep.c0.SetV(b.m_sweep.c);
         b.m_sweep.a0 = b.m_sweep.a;
         b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
         b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
         b.m_sweep.a += step.dt * b.m_angularVelocity;
         b.SynchronizeTransform();
      }
      for (i = 0;
      i < step.positionIterations; ++i) {
         var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
         var jointsOkay = true;
         for (j = 0;
         j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
         }
         if (contactsOkay && jointsOkay) {
            break;
         }
      }
      this.Report(contactSolver.m_constraints);
      if (allowSleep) {
         var minSleepTime = Number.MAX_VALUE;
         var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
         var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
         for (i = 0;
         i < this.m_bodyCount; ++i) {
            b = this.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) {
               continue;
            }
            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
               b.m_sleepTime = 0.0;
               minSleepTime = 0.0;
            }
            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
               b.m_sleepTime = 0.0;
               minSleepTime = 0.0;
            }
            else {
               b.m_sleepTime += step.dt;
               minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime);
            }
         }
         if (minSleepTime >= b2Settings.b2_timeToSleep) {
            for (i = 0;
            i < this.m_bodyCount; ++i) {
               b = this.m_bodies[i];
               b.SetAwake(false);
            }
         }
      }
   }
   b2Island.prototype.SolveTOI = function (subStep) {
      var i = 0;
      var j = 0;
      this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
      var contactSolver = this.m_contactSolver;
      for (i = 0;
      i < this.m_jointCount; ++i) {
         this.m_joints[i].InitVelocityConstraints(subStep);
      }
      for (i = 0;
      i < subStep.velocityIterations; ++i) {
         contactSolver.SolveVelocityConstraints();
         for (j = 0;
         j < this.m_jointCount; ++j) {
            this.m_joints[j].SolveVelocityConstraints(subStep);
         }
      }
      for (i = 0;
      i < this.m_bodyCount; ++i) {
         var b = this.m_bodies[i];
         if (b.GetType() == b2Body.b2_staticBody) continue;
         var translationX = subStep.dt * b.m_linearVelocity.x;
         var translationY = subStep.dt * b.m_linearVelocity.y;
         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt;
         }
         var rotation = subStep.dt * b.m_angularVelocity;
         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
               b.m_angularVelocity = (-b2Settings.b2_maxRotation * subStep.inv_dt);
            }
            else {
               b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt;
            }
         }
         b.m_sweep.c0.SetV(b.m_sweep.c);
         b.m_sweep.a0 = b.m_sweep.a;
         b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
         b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
         b.m_sweep.a += subStep.dt * b.m_angularVelocity;
         b.SynchronizeTransform();
      }
      var k_toiBaumgarte = 0.75;
      for (i = 0;
      i < subStep.positionIterations; ++i) {
         var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
         var jointsOkay = true;
         for (j = 0;
         j < this.m_jointCount; ++j) {
            var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
         }
         if (contactsOkay && jointsOkay) {
            break;
         }
      }
      this.Report(contactSolver.m_constraints);
   }
   b2Island.prototype.Report = function (constraints) {
      if (this.m_listener == null) {
         return;
      }
      for (var i = 0; i < this.m_contactCount; ++i) {
         var c = this.m_contacts[i];
         var cc = constraints[i];
         for (var j = 0; j < cc.pointCount; ++j) {
            b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
            b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
         }
         this.m_listener.PostSolve(c, b2Island.s_impulse);
      }
   }
   b2Island.prototype.AddBody = function (body) {
      body.m_islandIndex = this.m_bodyCount;
      this.m_bodies[this.m_bodyCount++] = body;
   }
   b2Island.prototype.AddContact = function (contact) {
      this.m_contacts[this.m_contactCount++] = contact;
   }
   b2Island.prototype.AddJoint = function (joint) {
      this.m_joints[this.m_jointCount++] = joint;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2Island.s_impulse = new b2ContactImpulse();
   });
   b2TimeStep.b2TimeStep = function () {};
   b2TimeStep.prototype.Set = function (step) {
      this.dt = step.dt;
      this.inv_dt = step.inv_dt;
      this.positionIterations = step.positionIterations;
      this.velocityIterations = step.velocityIterations;
      this.warmStarting = step.warmStarting;
   }
   b2World.b2World = function () {
      this.s_stack = new Vector();
      this.m_contactManager = new b2ContactManager();
      this.m_contactSolver = new b2ContactSolver();
      this.m_island = new b2Island();
   };
   b2World.prototype.b2World = function (gravity, doSleep) {
      this.m_destructionListener = null;
      this.m_debugDraw = null;
      this.m_bodyList = null;
      this.m_contactList = null;
      this.m_jointList = null;
      this.m_controllerList = null;
      this.m_bodyCount = 0;
      this.m_contactCount = 0;
      this.m_jointCount = 0;
      this.m_controllerCount = 0;
      b2World.m_warmStarting = true;
      b2World.m_continuousPhysics = true;
      this.m_allowSleep = doSleep;
      this.m_gravity = gravity;
      this.m_inv_dt0 = 0.0;
      this.m_contactManager.m_world = this;
      var bd = new b2BodyDef();
      this.m_groundBody = this.CreateBody(bd);
   }
   b2World.prototype.SetDestructionListener = function (listener) {
      this.m_destructionListener = listener;
   }
   b2World.prototype.SetContactFilter = function (filter) {
      this.m_contactManager.m_contactFilter = filter;
   }
   b2World.prototype.SetContactListener = function (listener) {
      this.m_contactManager.m_contactListener = listener;
   }
   b2World.prototype.SetDebugDraw = function (debugDraw) {
      this.m_debugDraw = debugDraw;
   }
   b2World.prototype.SetBroadPhase = function (broadPhase) {
      var oldBroadPhase = this.m_contactManager.m_broadPhase;
      this.m_contactManager.m_broadPhase = broadPhase;
      for (var b = this.m_bodyList; b; b = b.m_next) {
         for (var f = b.m_fixtureList; f; f = f.m_next) {
            f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f);
         }
      }
   }
   b2World.prototype.Validate = function () {
      this.m_contactManager.m_broadPhase.Validate();
   }
   b2World.prototype.GetProxyCount = function () {
      return this.m_contactManager.m_broadPhase.GetProxyCount();
   }
   b2World.prototype.CreateBody = function (def) {
      if (this.IsLocked() == true) {
         return null;
      }
      var b = new b2Body(def, this);
      b.m_prev = null;
      b.m_next = this.m_bodyList;
      if (this.m_bodyList) {
         this.m_bodyList.m_prev = b;
      }
      this.m_bodyList = b;
      ++this.m_bodyCount;
      return b;
   }
   b2World.prototype.DestroyBody = function (b) {
      if (this.IsLocked() == true) {
         return;
      }
      var jn = b.m_jointList;
      while (jn) {
         var jn0 = jn;
         jn = jn.next;
         if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
         }
         this.DestroyJoint(jn0.joint);
      }
      var coe = b.m_controllerList;
      while (coe) {
         var coe0 = coe;
         coe = coe.nextController;
         coe0.controller.RemoveBody(b);
      }
      var ce = b.m_contactList;
      while (ce) {
         var ce0 = ce;
         ce = ce.next;
         this.m_contactManager.Destroy(ce0.contact);
      }
      b.m_contactList = null;
      var f = b.m_fixtureList;
      while (f) {
         var f0 = f;
         f = f.m_next;
         if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeFixture(f0);
         }
         f0.DestroyProxy(this.m_contactManager.m_broadPhase);
         f0.Destroy();
      }
      b.m_fixtureList = null;
      b.m_fixtureCount = 0;
      if (b.m_prev) {
         b.m_prev.m_next = b.m_next;
      }
      if (b.m_next) {
         b.m_next.m_prev = b.m_prev;
      }
      if (b == this.m_bodyList) {
         this.m_bodyList = b.m_next;
      }--this.m_bodyCount;
   }
   b2World.prototype.CreateJoint = function (def) {
      var j = b2Joint.Create(def, null);
      j.m_prev = null;
      j.m_next = this.m_jointList;
      if (this.m_jointList) {
         this.m_jointList.m_prev = j;
      }
      this.m_jointList = j;
      ++this.m_jointCount;
      j.m_edgeA.joint = j;
      j.m_edgeA.other = j.m_bodyB;
      j.m_edgeA.prev = null;
      j.m_edgeA.next = j.m_bodyA.m_jointList;
      if (j.m_bodyA.m_jointList) j.m_bodyA.m_jointList.prev = j.m_edgeA;
      j.m_bodyA.m_jointList = j.m_edgeA;
      j.m_edgeB.joint = j;
      j.m_edgeB.other = j.m_bodyA;
      j.m_edgeB.prev = null;
      j.m_edgeB.next = j.m_bodyB.m_jointList;
      if (j.m_bodyB.m_jointList) j.m_bodyB.m_jointList.prev = j.m_edgeB;
      j.m_bodyB.m_jointList = j.m_edgeB;
      var bodyA = def.bodyA;
      var bodyB = def.bodyB;
      if (def.collideConnected == false) {
         var edge = bodyB.GetContactList();
         while (edge) {
            if (edge.other == bodyA) {
               edge.contact.FlagForFiltering();
            }
            edge = edge.next;
         }
      }
      return j;
   }
   b2World.prototype.DestroyJoint = function (j) {
      var collideConnected = j.m_collideConnected;
      if (j.m_prev) {
         j.m_prev.m_next = j.m_next;
      }
      if (j.m_next) {
         j.m_next.m_prev = j.m_prev;
      }
      if (j == this.m_jointList) {
         this.m_jointList = j.m_next;
      }
      var bodyA = j.m_bodyA;
      var bodyB = j.m_bodyB;
      bodyA.SetAwake(true);
      bodyB.SetAwake(true);
      if (j.m_edgeA.prev) {
         j.m_edgeA.prev.next = j.m_edgeA.next;
      }
      if (j.m_edgeA.next) {
         j.m_edgeA.next.prev = j.m_edgeA.prev;
      }
      if (j.m_edgeA == bodyA.m_jointList) {
         bodyA.m_jointList = j.m_edgeA.next;
      }
      j.m_edgeA.prev = null;
      j.m_edgeA.next = null;
      if (j.m_edgeB.prev) {
         j.m_edgeB.prev.next = j.m_edgeB.next;
      }
      if (j.m_edgeB.next) {
         j.m_edgeB.next.prev = j.m_edgeB.prev;
      }
      if (j.m_edgeB == bodyB.m_jointList) {
         bodyB.m_jointList = j.m_edgeB.next;
      }
      j.m_edgeB.prev = null;
      j.m_edgeB.next = null;
      b2Joint.Destroy(j, null);
      --this.m_jointCount;
      if (collideConnected == false) {
         var edge = bodyB.GetContactList();
         while (edge) {
            if (edge.other == bodyA) {
               edge.contact.FlagForFiltering();
            }
            edge = edge.next;
         }
      }
   }
   b2World.prototype.AddController = function (c) {
      c.m_next = this.m_controllerList;
      c.m_prev = null;
      this.m_controllerList = c;
      c.m_world = this;
      this.m_controllerCount++;
      return c;
   }
   b2World.prototype.RemoveController = function (c) {
      if (c.m_prev) c.m_prev.m_next = c.m_next;
      if (c.m_next) c.m_next.m_prev = c.m_prev;
      if (this.m_controllerList == c) this.m_controllerList = c.m_next;
      this.m_controllerCount--;
   }
   b2World.prototype.CreateController = function (controller) {
      if (controller.m_world != this) throw new Error("Controller can only be a member of one world");
      controller.m_next = this.m_controllerList;
      controller.m_prev = null;
      if (this.m_controllerList) this.m_controllerList.m_prev = controller;
      this.m_controllerList = controller;
      ++this.m_controllerCount;
      controller.m_world = this;
      return controller;
   }
   b2World.prototype.DestroyController = function (controller) {
      controller.Clear();
      if (controller.m_next) controller.m_next.m_prev = controller.m_prev;
      if (controller.m_prev) controller.m_prev.m_next = controller.m_next;
      if (controller == this.m_controllerList) this.m_controllerList = controller.m_next;
      --this.m_controllerCount;
   }
   b2World.prototype.SetWarmStarting = function (flag) {
      b2World.m_warmStarting = flag;
   }
   b2World.prototype.SetContinuousPhysics = function (flag) {
      b2World.m_continuousPhysics = flag;
   }
   b2World.prototype.GetBodyCount = function () {
      return this.m_bodyCount;
   }
   b2World.prototype.GetJointCount = function () {
      return this.m_jointCount;
   }
   b2World.prototype.GetContactCount = function () {
      return this.m_contactCount;
   }
   b2World.prototype.SetGravity = function (gravity) {
      this.m_gravity = gravity;
   }
   b2World.prototype.GetGravity = function () {
      return this.m_gravity;
   }
   b2World.prototype.GetGroundBody = function () {
      return this.m_groundBody;
   }
   b2World.prototype.Step = function (dt, velocityIterations, positionIterations) {
      if (dt === undefined) dt = 0;
      if (velocityIterations === undefined) velocityIterations = 0;
      if (positionIterations === undefined) positionIterations = 0;
      if (this.m_flags & b2World.e_newFixture) {
         this.m_contactManager.FindNewContacts();
         this.m_flags &= ~b2World.e_newFixture;
      }
      this.m_flags |= b2World.e_locked;
      var step = b2World.s_timestep2;
      step.dt = dt;
      step.velocityIterations = velocityIterations;
      step.positionIterations = positionIterations;
      if (dt > 0.0) {
         step.inv_dt = 1.0 / dt;
      }
      else {
         step.inv_dt = 0.0;
      }
      step.dtRatio = this.m_inv_dt0 * dt;
      step.warmStarting = b2World.m_warmStarting;
      this.m_contactManager.Collide();
      if (step.dt > 0.0) {
         this.Solve(step);
      }
      if (b2World.m_continuousPhysics && step.dt > 0.0) {
         this.SolveTOI(step);
      }
      if (step.dt > 0.0) {
         this.m_inv_dt0 = step.inv_dt;
      }
      this.m_flags &= ~b2World.e_locked;
   }
   b2World.prototype.ClearForces = function () {
      for (var body = this.m_bodyList; body; body = body.m_next) {
         body.m_force.SetZero();
         body.m_torque = 0.0;
      }
   }
   b2World.prototype.DrawDebugData = function () {
      if (this.m_debugDraw == null) {
         return;
      }
      //this.m_debugDraw.m_sprite.graphics.clear(); // DUEDO
      var flags = this.m_debugDraw.GetFlags();
      var i = 0;
      var b;
      var f;
      var s;
      var j;
      var bp;
      var invQ = new b2Vec2;
      var x1 = new b2Vec2;
      var x2 = new b2Vec2;
      var xf;
      var b1 = new b2AABB();
      var b2 = new b2AABB();
      var vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
      var color = new b2Color(0, 0, 0);
      if (flags & b2DebugDraw.e_shapeBit) {
         for (b = this.m_bodyList;
         b; b = b.m_next) {
            xf = b.m_xf;
            for (f = b.GetFixtureList();
            f; f = f.m_next) {
               s = f.GetShape();
               if (b.IsActive() == false) {
                  color.Set(0.5, 0.5, 0.3);
                  this.DrawShape(s, xf, color);
               }
               else if (b.GetType() == b2Body.b2_staticBody) {
                  color.Set(0.5, 0.9, 0.5);
                  this.DrawShape(s, xf, color);
               }
               else if (b.GetType() == b2Body.b2_kinematicBody) {
                  color.Set(0.5, 0.5, 0.9);
                  this.DrawShape(s, xf, color);
               }
               else if (b.IsAwake() == false) {
                  color.Set(0.6, 0.6, 0.6);
                  this.DrawShape(s, xf, color);
               }
               else {
                  color.Set(0.9, 0.7, 0.7);
                  this.DrawShape(s, xf, color);
               }
            }
         }
      }
      if (flags & b2DebugDraw.e_jointBit) {
         for (j = this.m_jointList;
         j; j = j.m_next) {
            this.DrawJoint(j);
         }
      }
      if (flags & b2DebugDraw.e_controllerBit) {
         for (var c = this.m_controllerList; c; c = c.m_next) {
            c.Draw(this.m_debugDraw);
         }
      }
      if (flags & b2DebugDraw.e_pairBit) {
         color.Set(0.3, 0.9, 0.9);
         for (var contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
            var fixtureA = contact.GetFixtureA();
            var fixtureB = contact.GetFixtureB();
            var cA = fixtureA.GetAABB().GetCenter();
            var cB = fixtureB.GetAABB().GetCenter();
            this.m_debugDraw.DrawSegment(cA, cB, color);
         }
      }
      if (flags & b2DebugDraw.e_aabbBit) {
         bp = this.m_contactManager.m_broadPhase;
         vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
         for (b = this.m_bodyList;
         b; b = b.GetNext()) {
            if (b.IsActive() == false) {
               continue;
            }
            for (f = b.GetFixtureList();
            f; f = f.GetNext()) {
               var aabb = bp.GetFatAABB(f.m_proxy);
               vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
               vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
               vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
               vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
               this.m_debugDraw.DrawPolygon(vs, 4, color);
            }
         }
      }
      if (flags & b2DebugDraw.e_centerOfMassBit) {
         for (b = this.m_bodyList;
         b; b = b.m_next) {
            xf = b2World.s_xf;
            xf.R = b.m_xf.R;
            xf.position = b.GetWorldCenter();
            this.m_debugDraw.DrawTransform(xf);
         }
      }
   }
   b2World.prototype.QueryAABB = function (callback, aabb) {
      var __this = this;
      var broadPhase = __this.m_contactManager.m_broadPhase;

      function WorldQueryWrapper(proxy) {
         return callback(broadPhase.GetUserData(proxy));
      };
      broadPhase.Query(WorldQueryWrapper, aabb);
   }
   b2World.prototype.QueryShape = function (callback, shape, transform) {
      var __this = this;
      if (transform === undefined) transform = null;
      if (transform == null) {
         transform = new b2Transform();
         transform.SetIdentity();
      }
      var broadPhase = __this.m_contactManager.m_broadPhase;

      function WorldQueryWrapper(proxy) {
         var fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
         if (b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) return callback(fixture);
         return true;
      };
      var aabb = new b2AABB();
      shape.ComputeAABB(aabb, transform);
      broadPhase.Query(WorldQueryWrapper, aabb);
   }
   b2World.prototype.QueryPoint = function (callback, p) {
      var __this = this;
      var broadPhase = __this.m_contactManager.m_broadPhase;

      function WorldQueryWrapper(proxy) {
         var fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
         if (fixture.TestPoint(p)) return callback(fixture);
         return true;
      };
      var aabb = new b2AABB();
      aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
      aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
      broadPhase.Query(WorldQueryWrapper, aabb);
   }
   b2World.prototype.RayCast = function (callback, point1, point2) {
      var __this = this;
      var broadPhase = __this.m_contactManager.m_broadPhase;
      var output = new b2RayCastOutput;

      function RayCastWrapper(input, proxy) {
         var userData = broadPhase.GetUserData(proxy);
         var fixture = (userData instanceof b2Fixture ? userData : null);
         var hit = fixture.RayCast(output, input);
         if (hit) {
            var fraction = output.fraction;
            var point = new b2Vec2((1.0 - fraction) * point1.x + fraction * point2.x, (1.0 - fraction) * point1.y + fraction * point2.y);
            return callback(fixture, point, output.normal, fraction);
         }
         return input.maxFraction;
      };
      var input = new b2RayCastInput(point1, point2);
      broadPhase.RayCast(RayCastWrapper, input);
   }
   b2World.prototype.RayCastOne = function (point1, point2) {
      var __this = this;
      var result;

      function RayCastOneWrapper(fixture, point, normal, fraction) {
         if (fraction === undefined) fraction = 0;
         result = fixture;
         return fraction;
      };
      __this.RayCast(RayCastOneWrapper, point1, point2);
      return result;
   }
   b2World.prototype.RayCastAll = function (point1, point2) {
      var __this = this;
      var result = new Vector();

      function RayCastAllWrapper(fixture, point, normal, fraction) {
         if (fraction === undefined) fraction = 0;
         result[result.length] = fixture;
         return 1;
      };
      __this.RayCast(RayCastAllWrapper, point1, point2);
      return result;
   }
   b2World.prototype.GetBodyList = function () {
      return this.m_bodyList;
   }
   b2World.prototype.GetJointList = function () {
      return this.m_jointList;
   }
   b2World.prototype.GetContactList = function () {
      return this.m_contactList;
   }
   b2World.prototype.IsLocked = function () {
      return (this.m_flags & b2World.e_locked) > 0;
   }
   b2World.prototype.Solve = function (step) {
      var b;
      for (var controller = this.m_controllerList; controller; controller = controller.m_next) {
         controller.Step(step);
      }
      var island = this.m_island;
      island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
      for (b = this.m_bodyList;
      b; b = b.m_next) {
         b.m_flags &= ~b2Body.e_islandFlag;
      }
      for (var c = this.m_contactList; c; c = c.m_next) {
         c.m_flags &= ~b2Contact.e_islandFlag;
      }
      for (var j = this.m_jointList; j; j = j.m_next) {
         j.m_islandFlag = false;
      }
      var stackSize = parseInt(this.m_bodyCount);
      var stack = this.s_stack;
      for (var seed = this.m_bodyList; seed; seed = seed.m_next) {
         if (seed.m_flags & b2Body.e_islandFlag) {
            continue;
         }
         if (seed.IsAwake() == false || seed.IsActive() == false) {
            continue;
         }
         if (seed.GetType() == b2Body.b2_staticBody) {
            continue;
         }
         island.Clear();
         var stackCount = 0;
         stack[stackCount++] = seed;
         seed.m_flags |= b2Body.e_islandFlag;
         while (stackCount > 0) {
            b = stack[--stackCount];
            island.AddBody(b);
            if (b.IsAwake() == false) {
               b.SetAwake(true);
            }
            if (b.GetType() == b2Body.b2_staticBody) {
               continue;
            }
            var other;
            for (var ce = b.m_contactList; ce; ce = ce.next) {
               if (ce.contact.m_flags & b2Contact.e_islandFlag) {
                  continue;
               }
               if (ce.contact.IsSensor() == true || ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false) {
                  continue;
               }
               island.AddContact(ce.contact);
               ce.contact.m_flags |= b2Contact.e_islandFlag;
               other = ce.other;
               if (other.m_flags & b2Body.e_islandFlag) {
                  continue;
               }
               stack[stackCount++] = other;
               other.m_flags |= b2Body.e_islandFlag;
            }
            for (var jn = b.m_jointList; jn; jn = jn.next) {
               if (jn.joint.m_islandFlag == true) {
                  continue;
               }
               other = jn.other;
               if (other.IsActive() == false) {
                  continue;
               }
               island.AddJoint(jn.joint);
               jn.joint.m_islandFlag = true;
               if (other.m_flags & b2Body.e_islandFlag) {
                  continue;
               }
               stack[stackCount++] = other;
               other.m_flags |= b2Body.e_islandFlag;
            }
         }
         island.Solve(step, this.m_gravity, this.m_allowSleep);
         for (var i = 0; i < island.m_bodyCount; ++i) {
            b = island.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) {
               b.m_flags &= ~b2Body.e_islandFlag;
            }
         }
      }
      for (i = 0;
      i < stack.length; ++i) {
         if (!stack[i]) break;
         stack[i] = null;
      }
      for (b = this.m_bodyList;
      b; b = b.m_next) {
         if (b.IsAwake() == false || b.IsActive() == false) {
            continue;
         }
         if (b.GetType() == b2Body.b2_staticBody) {
            continue;
         }
         b.SynchronizeFixtures();
      }
      this.m_contactManager.FindNewContacts();
   }
   b2World.prototype.SolveTOI = function (step) {
      var b;
      var fA;
      var fB;
      var bA;
      var bB;
      var cEdge;
      var j;
      var island = this.m_island;
      island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
      var queue = b2World.s_queue;
      for (b = this.m_bodyList;
      b; b = b.m_next) {
         b.m_flags &= ~b2Body.e_islandFlag;
         b.m_sweep.t0 = 0.0;
      }
      var c;
      for (c = this.m_contactList;
      c; c = c.m_next) {
         c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag);
      }
      for (j = this.m_jointList;
      j; j = j.m_next) {
         j.m_islandFlag = false;
      }
      for (;;) {
         var minContact = null;
         var minTOI = 1.0;
         for (c = this.m_contactList;
         c; c = c.m_next) {
            if (c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
               continue;
            }
            var toi = 1.0;
            if (c.m_flags & b2Contact.e_toiFlag) {
               toi = c.m_toi;
            }
            else {
               fA = c.m_fixtureA;
               fB = c.m_fixtureB;
               bA = fA.m_body;
               bB = fB.m_body;
               if ((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
                  continue;
               }
               var t0 = bA.m_sweep.t0;
               if (bA.m_sweep.t0 < bB.m_sweep.t0) {
                  t0 = bB.m_sweep.t0;
                  bA.m_sweep.Advance(t0);
               }
               else if (bB.m_sweep.t0 < bA.m_sweep.t0) {
                  t0 = bA.m_sweep.t0;
                  bB.m_sweep.Advance(t0);
               }
               toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
               b2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
               if (toi > 0.0 && toi < 1.0) {
                  toi = (1.0 - toi) * t0 + toi;
                  if (toi > 1) toi = 1;
               }
               c.m_toi = toi;
               c.m_flags |= b2Contact.e_toiFlag;
            }
            if (Number.MIN_VALUE < toi && toi < minTOI) {
               minContact = c;
               minTOI = toi;
            }
         }
         if (minContact == null || 1.0 - 100.0 * Number.MIN_VALUE < minTOI) {
            break;
         }
         fA = minContact.m_fixtureA;
         fB = minContact.m_fixtureB;
         bA = fA.m_body;
         bB = fB.m_body;
         b2World.s_backupA.Set(bA.m_sweep);
         b2World.s_backupB.Set(bB.m_sweep);
         bA.Advance(minTOI);
         bB.Advance(minTOI);
         minContact.Update(this.m_contactManager.m_contactListener);
         minContact.m_flags &= ~b2Contact.e_toiFlag;
         if (minContact.IsSensor() == true || minContact.IsEnabled() == false) {
            bA.m_sweep.Set(b2World.s_backupA);
            bB.m_sweep.Set(b2World.s_backupB);
            bA.SynchronizeTransform();
            bB.SynchronizeTransform();
            continue;
         }
         if (minContact.IsTouching() == false) {
            continue;
         }
         var seed = bA;
         if (seed.GetType() != b2Body.b2_dynamicBody) {
            seed = bB;
         }
         island.Clear();
         var queueStart = 0;
         var queueSize = 0;
         queue[queueStart + queueSize++] = seed;
         seed.m_flags |= b2Body.e_islandFlag;
         while (queueSize > 0) {
            b = queue[queueStart++];
            --queueSize;
            island.AddBody(b);
            if (b.IsAwake() == false) {
               b.SetAwake(true);
            }
            if (b.GetType() != b2Body.b2_dynamicBody) {
               continue;
            }
            for (cEdge = b.m_contactList;
            cEdge; cEdge = cEdge.next) {
               if (island.m_contactCount == island.m_contactCapacity) {
                  break;
               }
               if (cEdge.contact.m_flags & b2Contact.e_islandFlag) {
                  continue;
               }
               if (cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
                  continue;
               }
               island.AddContact(cEdge.contact);
               cEdge.contact.m_flags |= b2Contact.e_islandFlag;
               var other = cEdge.other;
               if (other.m_flags & b2Body.e_islandFlag) {
                  continue;
               }
               if (other.GetType() != b2Body.b2_staticBody) {
                  other.Advance(minTOI);
                  other.SetAwake(true);
               }
               queue[queueStart + queueSize] = other;
               ++queueSize;
               other.m_flags |= b2Body.e_islandFlag;
            }
            for (var jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
               if (island.m_jointCount == island.m_jointCapacity) continue;
               if (jEdge.joint.m_islandFlag == true) continue;
               other = jEdge.other;
               if (other.IsActive() == false) {
                  continue;
               }
               island.AddJoint(jEdge.joint);
               jEdge.joint.m_islandFlag = true;
               if (other.m_flags & b2Body.e_islandFlag) continue;
               if (other.GetType() != b2Body.b2_staticBody) {
                  other.Advance(minTOI);
                  other.SetAwake(true);
               }
               queue[queueStart + queueSize] = other;
               ++queueSize;
               other.m_flags |= b2Body.e_islandFlag;
            }
         }
         var subStep = b2World.s_timestep;
         subStep.warmStarting = false;
         subStep.dt = (1.0 - minTOI) * step.dt;
         subStep.inv_dt = 1.0 / subStep.dt;
         subStep.dtRatio = 0.0;
         subStep.velocityIterations = step.velocityIterations;
         subStep.positionIterations = step.positionIterations;
         island.SolveTOI(subStep);
         var i = 0;
         for (i = 0;
         i < island.m_bodyCount; ++i) {
            b = island.m_bodies[i];
            b.m_flags &= ~b2Body.e_islandFlag;
            if (b.IsAwake() == false) {
               continue;
            }
            if (b.GetType() != b2Body.b2_dynamicBody) {
               continue;
            }
            b.SynchronizeFixtures();
            for (cEdge = b.m_contactList;
            cEdge; cEdge = cEdge.next) {
               cEdge.contact.m_flags &= ~b2Contact.e_toiFlag;
            }
         }
         for (i = 0;
         i < island.m_contactCount; ++i) {
            c = island.m_contacts[i];
            c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag);
         }
         for (i = 0;
         i < island.m_jointCount; ++i) {
            j = island.m_joints[i];
            j.m_islandFlag = false;
         }
         this.m_contactManager.FindNewContacts();
      }
   }
   b2World.prototype.DrawJoint = function (joint) {
      var b1 = joint.GetBodyA();
      var b2 = joint.GetBodyB();
      var xf1 = b1.m_xf;
      var xf2 = b2.m_xf;
      var x1 = xf1.position;
      var x2 = xf2.position;
      var p1 = joint.GetAnchorA();
      var p2 = joint.GetAnchorB();
      var color = b2World.s_jointColor;
      switch (joint.m_type) {
      case b2Joint.e_distanceJoint:
         this.m_debugDraw.DrawSegment(p1, p2, color);
         break;
      case b2Joint.e_pulleyJoint:
         {
            var pulley = ((joint instanceof b2PulleyJoint ? joint : null));
            var s1 = pulley.GetGroundAnchorA();
            var s2 = pulley.GetGroundAnchorB();
            this.m_debugDraw.DrawSegment(s1, p1, color);
            this.m_debugDraw.DrawSegment(s2, p2, color);
            this.m_debugDraw.DrawSegment(s1, s2, color);
         }
         break;
      case b2Joint.e_mouseJoint:
         this.m_debugDraw.DrawSegment(p1, p2, color);
         break;
      default:
         if (b1 != this.m_groundBody) this.m_debugDraw.DrawSegment(x1, p1, color);
         this.m_debugDraw.DrawSegment(p1, p2, color);
         if (b2 != this.m_groundBody) this.m_debugDraw.DrawSegment(x2, p2, color);
      }
   }
   b2World.prototype.DrawShape = function (shape, xf, color) {
      switch (shape.m_type) {
      case b2Shape.e_circleShape:
         {
            var circle = ((shape instanceof b2CircleShape ? shape : null));
            var center = b2Math.MulX(xf, circle.m_p);
            var radius = circle.m_radius;
            var axis = xf.R.col1;
            this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
         }
         break;
      case b2Shape.e_polygonShape:
         {
            var i = 0;
            var poly = ((shape instanceof b2PolygonShape ? shape : null));
            var vertexCount = parseInt(poly.GetVertexCount());
            var localVertices = poly.GetVertices();
            var vertices = new Vector(vertexCount);
            for (i = 0;
            i < vertexCount; ++i) {
               vertices[i] = b2Math.MulX(xf, localVertices[i]);
            }
            this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
         }
         break;
      case b2Shape.e_edgeShape:
         {
            var edge = (shape instanceof b2EdgeShape ? shape : null);
            this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
         }
         break;
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.b2World.s_timestep2 = new b2TimeStep();
      Box2D.Dynamics.b2World.s_xf = new b2Transform();
      Box2D.Dynamics.b2World.s_backupA = new b2Sweep();
      Box2D.Dynamics.b2World.s_backupB = new b2Sweep();
      Box2D.Dynamics.b2World.s_timestep = new b2TimeStep();
      Box2D.Dynamics.b2World.s_queue = new Vector();
      Box2D.Dynamics.b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
      Box2D.Dynamics.b2World.e_newFixture = 0x0001;
      Box2D.Dynamics.b2World.e_locked = 0x0002;
   });
})();
(function () {
   var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
      b2Contact = Box2D.Dynamics.Contacts.b2Contact,
      b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
      b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
      b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
      b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
      b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
      b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
      b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
      b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
      b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
      b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
      b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
      b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
      b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2AABB = Box2D.Collision.b2AABB,
      b2Bound = Box2D.Collision.b2Bound,
      b2BoundValues = Box2D.Collision.b2BoundValues,
      b2Collision = Box2D.Collision.b2Collision,
      b2ContactID = Box2D.Collision.b2ContactID,
      b2ContactPoint = Box2D.Collision.b2ContactPoint,
      b2Distance = Box2D.Collision.b2Distance,
      b2DistanceInput = Box2D.Collision.b2DistanceInput,
      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
      b2DynamicTree = Box2D.Collision.b2DynamicTree,
      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
      b2Manifold = Box2D.Collision.b2Manifold,
      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
      b2Point = Box2D.Collision.b2Point,
      b2RayCastInput = Box2D.Collision.b2RayCastInput,
      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
      b2Segment = Box2D.Collision.b2Segment,
      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
      b2Simplex = Box2D.Collision.b2Simplex,
      b2SimplexCache = Box2D.Collision.b2SimplexCache,
      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
      b2TOIInput = Box2D.Collision.b2TOIInput,
      b2WorldManifold = Box2D.Collision.b2WorldManifold,
      ClipVertex = Box2D.Collision.ClipVertex,
      Features = Box2D.Collision.Features,
      IBroadPhase = Box2D.Collision.IBroadPhase;

   Box2D.inherit(b2CircleContact, Box2D.Dynamics.Contacts.b2Contact);
   b2CircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2CircleContact.b2CircleContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2CircleContact.Create = function (allocator) {
      return new b2CircleContact();
   }
   b2CircleContact.Destroy = function (contact, allocator) {}
   b2CircleContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
   }
   b2CircleContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.GetBody();
      var bB = this.m_fixtureB.GetBody();
      b2Collision.CollideCircles(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2CircleShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   }
   b2Contact.b2Contact = function () {
      this.m_nodeA = new b2ContactEdge();
      this.m_nodeB = new b2ContactEdge();
      this.m_manifold = new b2Manifold();
      this.m_oldManifold = new b2Manifold();
   };
   b2Contact.prototype.GetManifold = function () {
      return this.m_manifold;
   }
   b2Contact.prototype.GetWorldManifold = function (worldManifold) {
      var bodyA = this.m_fixtureA.GetBody();
      var bodyB = this.m_fixtureB.GetBody();
      var shapeA = this.m_fixtureA.GetShape();
      var shapeB = this.m_fixtureB.GetShape();
      worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
   }
   b2Contact.prototype.IsTouching = function () {
      return (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
   }
   b2Contact.prototype.IsContinuous = function () {
      return (this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag;
   }
   b2Contact.prototype.SetSensor = function (sensor) {
      if (sensor) {
         this.m_flags |= b2Contact.e_sensorFlag;
      }
      else {
         this.m_flags &= ~b2Contact.e_sensorFlag;
      }
   }
   b2Contact.prototype.IsSensor = function () {
      return (this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag;
   }
   b2Contact.prototype.SetEnabled = function (flag) {
      if (flag) {
         this.m_flags |= b2Contact.e_enabledFlag;
      }
      else {
         this.m_flags &= ~b2Contact.e_enabledFlag;
      }
   }
   b2Contact.prototype.IsEnabled = function () {
      return (this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag;
   }
   b2Contact.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Contact.prototype.GetFixtureA = function () {
      return this.m_fixtureA;
   }
   b2Contact.prototype.GetFixtureB = function () {
      return this.m_fixtureB;
   }
   b2Contact.prototype.FlagForFiltering = function () {
      this.m_flags |= b2Contact.e_filterFlag;
   }
   b2Contact.prototype.b2Contact = function () {}
   b2Contact.prototype.Reset = function (fixtureA, fixtureB) {
      if (fixtureA === undefined) fixtureA = null;
      if (fixtureB === undefined) fixtureB = null;
      this.m_flags = b2Contact.e_enabledFlag;
      if (!fixtureA || !fixtureB) {
         this.m_fixtureA = null;
         this.m_fixtureB = null;
         return;
      }
      if (fixtureA.IsSensor() || fixtureB.IsSensor()) {
         this.m_flags |= b2Contact.e_sensorFlag;
      }
      var bodyA = fixtureA.GetBody();
      var bodyB = fixtureB.GetBody();
      if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
         this.m_flags |= b2Contact.e_continuousFlag;
      }
      this.m_fixtureA = fixtureA;
      this.m_fixtureB = fixtureB;
      this.m_manifold.m_pointCount = 0;
      this.m_prev = null;
      this.m_next = null;
      this.m_nodeA.contact = null;
      this.m_nodeA.prev = null;
      this.m_nodeA.next = null;
      this.m_nodeA.other = null;
      this.m_nodeB.contact = null;
      this.m_nodeB.prev = null;
      this.m_nodeB.next = null;
      this.m_nodeB.other = null;
   }
   b2Contact.prototype.Update = function (listener) {
      var tManifold = this.m_oldManifold;
      this.m_oldManifold = this.m_manifold;
      this.m_manifold = tManifold;
      this.m_flags |= b2Contact.e_enabledFlag;
      var touching = false;
      var wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
      var bodyA = this.m_fixtureA.m_body;
      var bodyB = this.m_fixtureB.m_body;
      var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
      if (this.m_flags & b2Contact.e_sensorFlag) {
         if (aabbOverlap) {
            var shapeA = this.m_fixtureA.GetShape();
            var shapeB = this.m_fixtureB.GetShape();
            var xfA = bodyA.GetTransform();
            var xfB = bodyB.GetTransform();
            touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB);
         }
         this.m_manifold.m_pointCount = 0;
      }
      else {
         if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
            this.m_flags |= b2Contact.e_continuousFlag;
         }
         else {
            this.m_flags &= ~b2Contact.e_continuousFlag;
         }
         if (aabbOverlap) {
            this.Evaluate();
            touching = this.m_manifold.m_pointCount > 0;
            for (var i = 0; i < this.m_manifold.m_pointCount; ++i) {
               var mp2 = this.m_manifold.m_points[i];
               mp2.m_normalImpulse = 0.0;
               mp2.m_tangentImpulse = 0.0;
               var id2 = mp2.m_id;
               for (var j = 0; j < this.m_oldManifold.m_pointCount; ++j) {
                  var mp1 = this.m_oldManifold.m_points[j];
                  if (mp1.m_id.key == id2.key) {
                     mp2.m_normalImpulse = mp1.m_normalImpulse;
                     mp2.m_tangentImpulse = mp1.m_tangentImpulse;
                     break;
                  }
               }
            }
         }
         else {
            this.m_manifold.m_pointCount = 0;
         }
         if (touching != wasTouching) {
            bodyA.SetAwake(true);
            bodyB.SetAwake(true);
         }
      }
      if (touching) {
         this.m_flags |= b2Contact.e_touchingFlag;
      }
      else {
         this.m_flags &= ~b2Contact.e_touchingFlag;
      }
      if (wasTouching == false && touching == true) {
         listener.BeginContact(this);
      }
      if (wasTouching == true && touching == false) {
         listener.EndContact(this);
      }
      if ((this.m_flags & b2Contact.e_sensorFlag) == 0) {
         listener.PreSolve(this, this.m_oldManifold);
      }
   }
   b2Contact.prototype.Evaluate = function () {}
   b2Contact.prototype.ComputeTOI = function (sweepA, sweepB) {
      b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
      b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
      b2Contact.s_input.sweepA = sweepA;
      b2Contact.s_input.sweepB = sweepB;
      b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
      return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input);
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 0x0001;
      Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 0x0002;
      Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 0x0004;
      Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 0x0008;
      Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 0x0010;
      Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 0x0020;
      Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 0x0040;
      Box2D.Dynamics.Contacts.b2Contact.s_input = new b2TOIInput();
   });
   b2ContactConstraint.b2ContactConstraint = function () {
      this.localPlaneNormal = new b2Vec2();
      this.localPoint = new b2Vec2();
      this.normal = new b2Vec2();
      this.normalMass = new b2Mat22();
      this.K = new b2Mat22();
   };
   b2ContactConstraint.prototype.b2ContactConstraint = function () {
      this.points = new Vector(b2Settings.b2_maxManifoldPoints);
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         this.points[i] = new b2ContactConstraintPoint();
      }
   }
   b2ContactConstraintPoint.b2ContactConstraintPoint = function () {
      this.localPoint = new b2Vec2();
      this.rA = new b2Vec2();
      this.rB = new b2Vec2();
   };
   b2ContactEdge.b2ContactEdge = function () {};
   b2ContactFactory.b2ContactFactory = function () {};
   b2ContactFactory.prototype.b2ContactFactory = function (allocator) {
      this.m_allocator = allocator;
      this.InitializeRegisters();
   }
   b2ContactFactory.prototype.AddType = function (createFcn, destroyFcn, type1, type2) {
      if (type1 === undefined) type1 = 0;
      if (type2 === undefined) type2 = 0;
      this.m_registers[type1][type2].createFcn = createFcn;
      this.m_registers[type1][type2].destroyFcn = destroyFcn;
      this.m_registers[type1][type2].primary = true;
      if (type1 != type2) {
         this.m_registers[type2][type1].createFcn = createFcn;
         this.m_registers[type2][type1].destroyFcn = destroyFcn;
         this.m_registers[type2][type1].primary = false;
      }
   }
   b2ContactFactory.prototype.InitializeRegisters = function () {
      this.m_registers = new Vector(b2Shape.e_shapeTypeCount);
      for (var i = 0; i < b2Shape.e_shapeTypeCount; i++) {
         this.m_registers[i] = new Vector(b2Shape.e_shapeTypeCount);
         for (var j = 0; j < b2Shape.e_shapeTypeCount; j++) {
            this.m_registers[i][j] = new b2ContactRegister();
         }
      }
      this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
      this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
      this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
      this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
      this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape);
   }
   b2ContactFactory.prototype.Create = function (fixtureA, fixtureB) {
      var type1 = parseInt(fixtureA.GetType());
      var type2 = parseInt(fixtureB.GetType());
      var reg = this.m_registers[type1][type2];
      var c;
      if (reg.pool) {
         c = reg.pool;
         reg.pool = c.m_next;
         reg.poolCount--;
         c.Reset(fixtureA, fixtureB);
         return c;
      }
      var createFcn = reg.createFcn;
      if (createFcn != null) {
         if (reg.primary) {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureA, fixtureB);
            return c;
         }
         else {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureB, fixtureA);
            return c;
         }
      }
      else {
         return null;
      }
   }
   b2ContactFactory.prototype.Destroy = function (contact) {
      if (contact.m_manifold.m_pointCount > 0) {
         contact.m_fixtureA.m_body.SetAwake(true);
         contact.m_fixtureB.m_body.SetAwake(true);
      }
      var type1 = parseInt(contact.m_fixtureA.GetType());
      var type2 = parseInt(contact.m_fixtureB.GetType());
      var reg = this.m_registers[type1][type2];
      if (true) {
         reg.poolCount++;
         contact.m_next = reg.pool;
         reg.pool = contact;
      }
      var destroyFcn = reg.destroyFcn;
      destroyFcn(contact, this.m_allocator);
   }
   b2ContactRegister.b2ContactRegister = function () {};
   b2ContactResult.b2ContactResult = function () {
      this.position = new b2Vec2();
      this.normal = new b2Vec2();
      this.id = new b2ContactID();
   };
   b2ContactSolver.b2ContactSolver = function () {
      this.m_step = new b2TimeStep();
      this.m_constraints = new Vector();
   };
   b2ContactSolver.prototype.b2ContactSolver = function () {}
   b2ContactSolver.prototype.Initialize = function (step, contacts, contactCount, allocator) {
      if (contactCount === undefined) contactCount = 0;
      var contact;
      this.m_step.Set(step);
      this.m_allocator = allocator;
      var i = 0;
      var tVec;
      var tMat;
      this.m_constraintCount = contactCount;
      while (this.m_constraints.length < this.m_constraintCount) {
         this.m_constraints[this.m_constraints.length] = new b2ContactConstraint();
      }
      for (i = 0;
      i < contactCount; ++i) {
         contact = contacts[i];
         var fixtureA = contact.m_fixtureA;
         var fixtureB = contact.m_fixtureB;
         var shapeA = fixtureA.m_shape;
         var shapeB = fixtureB.m_shape;
         var radiusA = shapeA.m_radius;
         var radiusB = shapeB.m_radius;
         var bodyA = fixtureA.m_body;
         var bodyB = fixtureB.m_body;
         var manifold = contact.GetManifold();
         var friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
         var restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
         var vAX = bodyA.m_linearVelocity.x;
         var vAY = bodyA.m_linearVelocity.y;
         var vBX = bodyB.m_linearVelocity.x;
         var vBY = bodyB.m_linearVelocity.y;
         var wA = bodyA.m_angularVelocity;
         var wB = bodyB.m_angularVelocity;
         b2Settings.b2Assert(manifold.m_pointCount > 0);
         b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
         var normalX = b2ContactSolver.s_worldManifold.m_normal.x;
         var normalY = b2ContactSolver.s_worldManifold.m_normal.y;
         var cc = this.m_constraints[i];
         cc.bodyA = bodyA;
         cc.bodyB = bodyB;
         cc.manifold = manifold;
         cc.normal.x = normalX;
         cc.normal.y = normalY;
         cc.pointCount = manifold.m_pointCount;
         cc.friction = friction;
         cc.restitution = restitution;
         cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
         cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
         cc.localPoint.x = manifold.m_localPoint.x;
         cc.localPoint.y = manifold.m_localPoint.y;
         cc.radius = radiusA + radiusB;
         cc.type = manifold.m_type;
         for (var k = 0; k < cc.pointCount; ++k) {
            var cp = manifold.m_points[k];
            var ccp = cc.points[k];
            ccp.normalImpulse = cp.m_normalImpulse;
            ccp.tangentImpulse = cp.m_tangentImpulse;
            ccp.localPoint.SetV(cp.m_localPoint);
            var rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
            var rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
            var rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
            var rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
            var rnA = rAX * normalY - rAY * normalX;
            var rnB = rBX * normalY - rBY * normalX;
            rnA *= rnA;
            rnB *= rnB;
            var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
            ccp.normalMass = 1.0 / kNormal;
            var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
            kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
            ccp.equalizedMass = 1.0 / kEqualized;
            var tangentX = normalY;
            var tangentY = (-normalX);
            var rtA = rAX * tangentY - rAY * tangentX;
            var rtB = rBX * tangentY - rBY * tangentX;
            rtA *= rtA;
            rtB *= rtB;
            var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
            ccp.tangentMass = 1.0 / kTangent;
            ccp.velocityBias = 0.0;
            var tX = vBX + ((-wB * rBY)) - vAX - ((-wA * rAY));
            var tY = vBY + (wB * rBX) - vAY - (wA * rAX);
            var vRel = cc.normal.x * tX + cc.normal.y * tY;
            if (vRel < (-b2Settings.b2_velocityThreshold)) {
               ccp.velocityBias += (-cc.restitution * vRel);
            }
         }
         if (cc.pointCount == 2) {
            var ccp1 = cc.points[0];
            var ccp2 = cc.points[1];
            var invMassA = bodyA.m_invMass;
            var invIA = bodyA.m_invI;
            var invMassB = bodyB.m_invMass;
            var invIB = bodyB.m_invI;
            var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
            var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
            var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
            var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
            var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
            var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
            var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
            var k_maxConditionNumber = 100.0;
            if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
               cc.K.col1.Set(k11, k12);
               cc.K.col2.Set(k12, k22);
               cc.K.GetInverse(cc.normalMass);
            }
            else {
               cc.pointCount = 1;
            }
         }
      }
   }
   b2ContactSolver.prototype.InitVelocityConstraints = function (step) {
      var tVec;
      var tVec2;
      var tMat;
      for (var i = 0; i < this.m_constraintCount; ++i) {
         var c = this.m_constraints[i];
         var bodyA = c.bodyA;
         var bodyB = c.bodyB;
         var invMassA = bodyA.m_invMass;
         var invIA = bodyA.m_invI;
         var invMassB = bodyB.m_invMass;
         var invIB = bodyB.m_invI;
         var normalX = c.normal.x;
         var normalY = c.normal.y;
         var tangentX = normalY;
         var tangentY = (-normalX);
         var tX = 0;
         var j = 0;
         var tCount = 0;
         if (step.warmStarting) {
            tCount = c.pointCount;
            for (j = 0;
            j < tCount; ++j) {
               var ccp = c.points[j];
               ccp.normalImpulse *= step.dtRatio;
               ccp.tangentImpulse *= step.dtRatio;
               var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
               var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
               bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
               bodyA.m_linearVelocity.x -= invMassA * PX;
               bodyA.m_linearVelocity.y -= invMassA * PY;
               bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
               bodyB.m_linearVelocity.x += invMassB * PX;
               bodyB.m_linearVelocity.y += invMassB * PY;
            }
         }
         else {
            tCount = c.pointCount;
            for (j = 0;
            j < tCount; ++j) {
               var ccp2 = c.points[j];
               ccp2.normalImpulse = 0.0;
               ccp2.tangentImpulse = 0.0;
            }
         }
      }
   }
   b2ContactSolver.prototype.SolveVelocityConstraints = function () {
      var j = 0;
      var ccp;
      var rAX = 0;
      var rAY = 0;
      var rBX = 0;
      var rBY = 0;
      var dvX = 0;
      var dvY = 0;
      var vn = 0;
      var vt = 0;
      var lambda = 0;
      var maxFriction = 0;
      var newImpulse = 0;
      var PX = 0;
      var PY = 0;
      var dX = 0;
      var dY = 0;
      var P1X = 0;
      var P1Y = 0;
      var P2X = 0;
      var P2Y = 0;
      var tMat;
      var tVec;
      for (var i = 0; i < this.m_constraintCount; ++i) {
         var c = this.m_constraints[i];
         var bodyA = c.bodyA;
         var bodyB = c.bodyB;
         var wA = bodyA.m_angularVelocity;
         var wB = bodyB.m_angularVelocity;
         var vA = bodyA.m_linearVelocity;
         var vB = bodyB.m_linearVelocity;
         var invMassA = bodyA.m_invMass;
         var invIA = bodyA.m_invI;
         var invMassB = bodyB.m_invMass;
         var invIB = bodyB.m_invI;
         var normalX = c.normal.x;
         var normalY = c.normal.y;
         var tangentX = normalY;
         var tangentY = (-normalX);
         var friction = c.friction;
         var tX = 0;
         for (j = 0;
         j < c.pointCount; j++) {
            ccp = c.points[j];
            dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
            dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
            vt = dvX * tangentX + dvY * tangentY;
            lambda = ccp.tangentMass * (-vt);
            maxFriction = friction * ccp.normalImpulse;
            newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, (-maxFriction), maxFriction);
            lambda = newImpulse - ccp.tangentImpulse;
            PX = lambda * tangentX;
            PY = lambda * tangentY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.tangentImpulse = newImpulse;
         }
         var tCount = parseInt(c.pointCount);
         if (c.pointCount == 1) {
            ccp = c.points[0];
            dvX = vB.x + ((-wB * ccp.rB.y)) - vA.x - ((-wA * ccp.rA.y));
            dvY = vB.y + (wB * ccp.rB.x) - vA.y - (wA * ccp.rA.x);
            vn = dvX * normalX + dvY * normalY;
            lambda = (-ccp.normalMass * (vn - ccp.velocityBias));
            newImpulse = ccp.normalImpulse + lambda;
            newImpulse = newImpulse > 0 ? newImpulse : 0.0;
            lambda = newImpulse - ccp.normalImpulse;
            PX = lambda * normalX;
            PY = lambda * normalY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.normalImpulse = newImpulse;
         }
         else {
            var cp1 = c.points[0];
            var cp2 = c.points[1];
            var aX = cp1.normalImpulse;
            var aY = cp2.normalImpulse;
            var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
            var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
            var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
            var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
            var vn1 = dv1X * normalX + dv1Y * normalY;
            var vn2 = dv2X * normalX + dv2Y * normalY;
            var bX = vn1 - cp1.velocityBias;
            var bY = vn2 - cp2.velocityBias;
            tMat = c.K;
            bX -= tMat.col1.x * aX + tMat.col2.x * aY;
            bY -= tMat.col1.y * aX + tMat.col2.y * aY;
            var k_errorTol = 0.001;
            for (;;) {
               tMat = c.normalMass;
               var xX = (-(tMat.col1.x * bX + tMat.col2.x * bY));
               var xY = (-(tMat.col1.y * bX + tMat.col2.y * bY));
               if (xX >= 0.0 && xY >= 0.0) {
                  dX = xX - aX;
                  dY = xY - aY;
                  P1X = dX * normalX;
                  P1Y = dX * normalY;
                  P2X = dY * normalX;
                  P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               xX = (-cp1.normalMass * bX);
               xY = 0.0;
               vn1 = 0.0;
               vn2 = c.K.col1.y * xX + bY;
               if (xX >= 0.0 && vn2 >= 0.0) {
                  dX = xX - aX;
                  dY = xY - aY;
                  P1X = dX * normalX;
                  P1Y = dX * normalY;
                  P2X = dY * normalX;
                  P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               xX = 0.0;
               xY = (-cp2.normalMass * bY);
               vn1 = c.K.col2.x * xY + bX;
               vn2 = 0.0;
               if (xY >= 0.0 && vn1 >= 0.0) {
                  dX = xX - aX;
                  dY = xY - aY;
                  P1X = dX * normalX;
                  P1Y = dX * normalY;
                  P2X = dY * normalX;
                  P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               xX = 0.0;
               xY = 0.0;
               vn1 = bX;
               vn2 = bY;
               if (vn1 >= 0.0 && vn2 >= 0.0) {
                  dX = xX - aX;
                  dY = xY - aY;
                  P1X = dX * normalX;
                  P1Y = dX * normalY;
                  P2X = dY * normalX;
                  P2Y = dY * normalY;
                  vA.x -= invMassA * (P1X + P2X);
                  vA.y -= invMassA * (P1Y + P2Y);
                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                  vB.x += invMassB * (P1X + P2X);
                  vB.y += invMassB * (P1Y + P2Y);
                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                  cp1.normalImpulse = xX;
                  cp2.normalImpulse = xY;
                  break;
               }
               break;
            }
         }
         bodyA.m_angularVelocity = wA;
         bodyB.m_angularVelocity = wB;
      }
   }
   b2ContactSolver.prototype.FinalizeVelocityConstraints = function () {
      for (var i = 0; i < this.m_constraintCount; ++i) {
         var c = this.m_constraints[i];
         var m = c.manifold;
         for (var j = 0; j < c.pointCount; ++j) {
            var point1 = m.m_points[j];
            var point2 = c.points[j];
            point1.m_normalImpulse = point2.normalImpulse;
            point1.m_tangentImpulse = point2.tangentImpulse;
         }
      }
   }
   b2ContactSolver.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var minSeparation = 0.0;
      for (var i = 0; i < this.m_constraintCount; i++) {
         var c = this.m_constraints[i];
         var bodyA = c.bodyA;
         var bodyB = c.bodyB;
         var invMassA = bodyA.m_mass * bodyA.m_invMass;
         var invIA = bodyA.m_mass * bodyA.m_invI;
         var invMassB = bodyB.m_mass * bodyB.m_invMass;
         var invIB = bodyB.m_mass * bodyB.m_invI;
         b2ContactSolver.s_psm.Initialize(c);
         var normal = b2ContactSolver.s_psm.m_normal;
         for (var j = 0; j < c.pointCount; j++) {
            var ccp = c.points[j];
            var point = b2ContactSolver.s_psm.m_points[j];
            var separation = b2ContactSolver.s_psm.m_separations[j];
            var rAX = point.x - bodyA.m_sweep.c.x;
            var rAY = point.y - bodyA.m_sweep.c.y;
            var rBX = point.x - bodyB.m_sweep.c.x;
            var rBY = point.y - bodyB.m_sweep.c.y;
            minSeparation = minSeparation < separation ? minSeparation : separation;
            var C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), (-b2Settings.b2_maxLinearCorrection), 0.0);
            var impulse = (-ccp.equalizedMass * C);
            var PX = impulse * normal.x;
            var PY = impulse * normal.y;bodyA.m_sweep.c.x -= invMassA * PX;
            bodyA.m_sweep.c.y -= invMassA * PY;
            bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
            bodyA.SynchronizeTransform();
            bodyB.m_sweep.c.x += invMassB * PX;
            bodyB.m_sweep.c.y += invMassB * PY;
            bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
            bodyB.SynchronizeTransform();
         }
      }
      return minSeparation > (-1.5 * b2Settings.b2_linearSlop);
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new b2WorldManifold();
      Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new b2PositionSolverManifold();
   });
   Box2D.inherit(b2EdgeAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
   b2EdgeAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2EdgeAndCircleContact.b2EdgeAndCircleContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2EdgeAndCircleContact.Create = function (allocator) {
      return new b2EdgeAndCircleContact();
   }
   b2EdgeAndCircleContact.Destroy = function (contact, allocator) {}
   b2EdgeAndCircleContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
   }
   b2EdgeAndCircleContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.GetBody();
      var bB = this.m_fixtureB.GetBody();
      this.b2CollideEdgeAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2EdgeShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   }
   b2EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle = function (manifold, edge, xf1, circle, xf2) {}
   Box2D.inherit(b2NullContact, Box2D.Dynamics.Contacts.b2Contact);
   b2NullContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2NullContact.b2NullContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2NullContact.prototype.b2NullContact = function () {
      this.__super.b2Contact.call(this);
   }
   b2NullContact.prototype.Evaluate = function () {}
   Box2D.inherit(b2PolyAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
   b2PolyAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2PolyAndCircleContact.b2PolyAndCircleContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2PolyAndCircleContact.Create = function (allocator) {
      return new b2PolyAndCircleContact();
   }
   b2PolyAndCircleContact.Destroy = function (contact, allocator) {}
   b2PolyAndCircleContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
      b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
      b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape);
   }
   b2PolyAndCircleContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.m_body;
      var bB = this.m_fixtureB.m_body;
      b2Collision.CollidePolygonAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   }
   Box2D.inherit(b2PolyAndEdgeContact, Box2D.Dynamics.Contacts.b2Contact);
   b2PolyAndEdgeContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2PolyAndEdgeContact.b2PolyAndEdgeContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2PolyAndEdgeContact.Create = function (allocator) {
      return new b2PolyAndEdgeContact();
   }
   b2PolyAndEdgeContact.Destroy = function (contact, allocator) {}
   b2PolyAndEdgeContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
      b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
      b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape);
   }
   b2PolyAndEdgeContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.GetBody();
      var bB = this.m_fixtureB.GetBody();
      this.b2CollidePolyAndEdge(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2EdgeShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   }
   b2PolyAndEdgeContact.prototype.b2CollidePolyAndEdge = function (manifold, polygon, xf1, edge, xf2) {}
   Box2D.inherit(b2PolygonContact, Box2D.Dynamics.Contacts.b2Contact);
   b2PolygonContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
   b2PolygonContact.b2PolygonContact = function () {
      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
   };
   b2PolygonContact.Create = function (allocator) {
      return new b2PolygonContact();
   }
   b2PolygonContact.Destroy = function (contact, allocator) {}
   b2PolygonContact.prototype.Reset = function (fixtureA, fixtureB) {
      this.__super.Reset.call(this, fixtureA, fixtureB);
   }
   b2PolygonContact.prototype.Evaluate = function () {
      var bA = this.m_fixtureA.GetBody();
      var bB = this.m_fixtureB.GetBody();
      b2Collision.CollidePolygons(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2PolygonShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
   }
   b2PositionSolverManifold.b2PositionSolverManifold = function () {};
   b2PositionSolverManifold.prototype.b2PositionSolverManifold = function () {
      this.m_normal = new b2Vec2();
      this.m_separations = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
         this.m_points[i] = new b2Vec2();
      }
   }
   b2PositionSolverManifold.prototype.Initialize = function (cc) {
      b2Settings.b2Assert(cc.pointCount > 0);
      var i = 0;
      var clipPointX = 0;
      var clipPointY = 0;
      var tMat;
      var tVec;
      var planePointX = 0;
      var planePointY = 0;
      switch (cc.type) {
      case b2Manifold.e_circles:
         {
            tMat = cc.bodyA.m_xf.R;
            tVec = cc.localPoint;
            var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tMat = cc.bodyB.m_xf.R;
            tVec = cc.points[0].localPoint;
            var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            var dX = pointBX - pointAX;
            var dY = pointBY - pointAY;
            var d2 = dX * dX + dY * dY;
            if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
               var d = Math.sqrt(d2);
               this.m_normal.x = dX / d;
               this.m_normal.y = dY / d;
            }
            else {
               this.m_normal.x = 1.0;
               this.m_normal.y = 0.0;
            }
            this.m_points[0].x = 0.5 * (pointAX + pointBX);
            this.m_points[0].y = 0.5 * (pointAY + pointBY);
            this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
         }
         break;
      case b2Manifold.e_faceA:
         {
            tMat = cc.bodyA.m_xf.R;
            tVec = cc.localPlaneNormal;
            this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = cc.bodyA.m_xf.R;
            tVec = cc.localPoint;
            planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tMat = cc.bodyB.m_xf.R;
            for (i = 0;
            i < cc.pointCount; ++i) {
               tVec = cc.points[i].localPoint;
               clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
               clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
               this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
               this.m_points[i].x = clipPointX;
               this.m_points[i].y = clipPointY;
            }
         }
         break;
      case b2Manifold.e_faceB:
         {
            tMat = cc.bodyB.m_xf.R;
            tVec = cc.localPlaneNormal;
            this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = cc.bodyB.m_xf.R;
            tVec = cc.localPoint;
            planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tMat = cc.bodyA.m_xf.R;
            for (i = 0;
            i < cc.pointCount; ++i) {
               tVec = cc.points[i].localPoint;
               clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
               clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
               this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
               this.m_points[i].Set(clipPointX, clipPointY);
            }
            this.m_normal.x *= (-1);
            this.m_normal.y *= (-1);
         }
         break;
      }
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new b2Vec2();
      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new b2Vec2();
   });
})();
(function () {
   var b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2Shape = Box2D.Collision.Shapes.b2Shape,
      b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController,
      b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController,
      b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController,
      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
      b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
      b2GravityController = Box2D.Dynamics.Controllers.b2GravityController,
      b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;

   Box2D.inherit(b2BuoyancyController, Box2D.Dynamics.Controllers.b2Controller);
   b2BuoyancyController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2BuoyancyController.b2BuoyancyController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.normal = new b2Vec2(0, (-1));
      this.offset = 0;
      this.density = 0;
      this.velocity = new b2Vec2(0, 0);
      this.linearDrag = 2;
      this.angularDrag = 1;
      this.useDensity = false;
      this.useWorldGravity = true;
      this.gravity = null;
   };
   b2BuoyancyController.prototype.Step = function (step) {
      if (!this.m_bodyList) return;
      if (this.useWorldGravity) {
         this.gravity = this.GetWorld().GetGravity().Copy();
      }
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (body.IsAwake() == false) {
            continue;
         }
         var areac = new b2Vec2();
         var massc = new b2Vec2();
         var area = 0.0;
         var mass = 0.0;
         for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
            var sc = new b2Vec2();
            var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
            area += sarea;
            areac.x += sarea * sc.x;
            areac.y += sarea * sc.y;
            var shapeDensity = 0;
            if (this.useDensity) {
               shapeDensity = 1;
            }
            else {
               shapeDensity = 1;
            }
            mass += sarea * shapeDensity;
            massc.x += sarea * sc.x * shapeDensity;
            massc.y += sarea * sc.y * shapeDensity;
         }
         areac.x /= area;
         areac.y /= area;
         massc.x /= mass;
         massc.y /= mass;
         if (area < Number.MIN_VALUE) continue;
         var buoyancyForce = this.gravity.GetNegative();
         buoyancyForce.Multiply(this.density * area);
         body.ApplyForce(buoyancyForce, massc);
         var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
         dragForce.Subtract(this.velocity);
         dragForce.Multiply((-this.linearDrag * area));
         body.ApplyForce(dragForce, areac);
         body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
      }
   }
   b2BuoyancyController.prototype.Draw = function (debugDraw) {
      var r = 1000;
      var p1 = new b2Vec2();
      var p2 = new b2Vec2();
      p1.x = this.normal.x * this.offset + this.normal.y * r;
      p1.y = this.normal.y * this.offset - this.normal.x * r;
      p2.x = this.normal.x * this.offset - this.normal.y * r;
      p2.y = this.normal.y * this.offset + this.normal.x * r;
      var color = new b2Color(0, 0, 1);
      debugDraw.DrawSegment(p1, p2, color);
   }
   Box2D.inherit(b2ConstantAccelController, Box2D.Dynamics.Controllers.b2Controller);
   b2ConstantAccelController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2ConstantAccelController.b2ConstantAccelController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.A = new b2Vec2(0, 0);
   };
   b2ConstantAccelController.prototype.Step = function (step) {
      var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) continue;
         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y));
      }
   }
   Box2D.inherit(b2ConstantForceController, Box2D.Dynamics.Controllers.b2Controller);
   b2ConstantForceController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2ConstantForceController.b2ConstantForceController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.F = new b2Vec2(0, 0);
   };
   b2ConstantForceController.prototype.Step = function (step) {
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) continue;
         body.ApplyForce(this.F, body.GetWorldCenter());
      }
   }
   b2Controller.b2Controller = function () {};
   b2Controller.prototype.Step = function (step) {}
   b2Controller.prototype.Draw = function (debugDraw) {}
   b2Controller.prototype.AddBody = function (body) {
      var edge = new b2ControllerEdge();
      edge.controller = this;
      edge.body = body;
      edge.nextBody = this.m_bodyList;
      edge.prevBody = null;
      this.m_bodyList = edge;
      if (edge.nextBody) edge.nextBody.prevBody = edge;
      this.m_bodyCount++;
      edge.nextController = body.m_controllerList;
      edge.prevController = null;
      body.m_controllerList = edge;
      if (edge.nextController) edge.nextController.prevController = edge;
      body.m_controllerCount++;
   }
   b2Controller.prototype.RemoveBody = function (body) {
      var edge = body.m_controllerList;
      while (edge && edge.controller != this)
      edge = edge.nextController;
      if (edge.prevBody) edge.prevBody.nextBody = edge.nextBody;
      if (edge.nextBody) edge.nextBody.prevBody = edge.prevBody;
      if (edge.nextController) edge.nextController.prevController = edge.prevController;
      if (edge.prevController) edge.prevController.nextController = edge.nextController;
      if (this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
      if (body.m_controllerList == edge) body.m_controllerList = edge.nextController;
      body.m_controllerCount--;
      this.m_bodyCount--;
   }
   b2Controller.prototype.Clear = function () {
      while (this.m_bodyList)
      this.RemoveBody(this.m_bodyList.body);
   }
   b2Controller.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Controller.prototype.GetWorld = function () {
      return this.m_world;
   }
   b2Controller.prototype.GetBodyList = function () {
      return this.m_bodyList;
   }
   b2ControllerEdge.b2ControllerEdge = function () {};
   Box2D.inherit(b2GravityController, Box2D.Dynamics.Controllers.b2Controller);
   b2GravityController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2GravityController.b2GravityController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.G = 1;
      this.invSqr = true;
   };
   b2GravityController.prototype.Step = function (step) {
      var i = null;
      var body1 = null;
      var p1 = null;
      var mass1 = 0;
      var j = null;
      var body2 = null;
      var p2 = null;
      var dx = 0;
      var dy = 0;
      var r2 = 0;
      var f = null;
      if (this.invSqr) {
         for (i = this.m_bodyList;
         i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
            j != i; j = j.nextBody) {
               body2 = j.body;
               p2 = body2.GetWorldCenter();
               dx = p2.x - p1.x;
               dy = p2.y - p1.y;
               r2 = dx * dx + dy * dy;
               if (r2 < Number.MIN_VALUE) continue;
               f = new b2Vec2(dx, dy);
               f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
               if (body1.IsAwake()) body1.ApplyForce(f, p1);
               f.Multiply((-1));
               if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
         }
      }
      else {
         for (i = this.m_bodyList;
         i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
            j != i; j = j.nextBody) {
               body2 = j.body;
               p2 = body2.GetWorldCenter();
               dx = p2.x - p1.x;
               dy = p2.y - p1.y;
               r2 = dx * dx + dy * dy;
               if (r2 < Number.MIN_VALUE) continue;
               f = new b2Vec2(dx, dy);
               f.Multiply(this.G / r2 * mass1 * body2.GetMass());
               if (body1.IsAwake()) body1.ApplyForce(f, p1);
               f.Multiply((-1));
               if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
         }
      }
   }
   Box2D.inherit(b2TensorDampingController, Box2D.Dynamics.Controllers.b2Controller);
   b2TensorDampingController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
   b2TensorDampingController.b2TensorDampingController = function () {
      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
      this.T = new b2Mat22();
      this.maxTimestep = 0;
   };
   b2TensorDampingController.prototype.SetAxisAligned = function (xDamping, yDamping) {
      if (xDamping === undefined) xDamping = 0;
      if (yDamping === undefined) yDamping = 0;
      this.T.col1.x = (-xDamping);
      this.T.col1.y = 0;
      this.T.col2.x = 0;
      this.T.col2.y = (-yDamping);
      if (xDamping > 0 || yDamping > 0) {
         this.maxTimestep = 1 / Math.max(xDamping, yDamping);
      }
      else {
         this.maxTimestep = 0;
      }
   }
   b2TensorDampingController.prototype.Step = function (step) {
      var timestep = step.dt;
      if (timestep <= Number.MIN_VALUE) return;
      if (timestep > this.maxTimestep && this.maxTimestep > 0) timestep = this.maxTimestep;
      for (var i = this.m_bodyList; i; i = i.nextBody) {
         var body = i.body;
         if (!body.IsAwake()) {
            continue;
         }
         var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep));
      }
   }
})();
(function () {
   var b2Color = Box2D.Common.b2Color,
      b2internal = Box2D.Common.b2internal,
      b2Settings = Box2D.Common.b2Settings,
      b2Mat22 = Box2D.Common.Math.b2Mat22,
      b2Mat33 = Box2D.Common.Math.b2Mat33,
      b2Math = Box2D.Common.Math.b2Math,
      b2Sweep = Box2D.Common.Math.b2Sweep,
      b2Transform = Box2D.Common.Math.b2Transform,
      b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2Vec3 = Box2D.Common.Math.b2Vec3,
      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
      b2Joint = Box2D.Dynamics.Joints.b2Joint,
      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
      b2Body = Box2D.Dynamics.b2Body,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
      b2ContactListener = Box2D.Dynamics.b2ContactListener,
      b2ContactManager = Box2D.Dynamics.b2ContactManager,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
      b2FilterData = Box2D.Dynamics.b2FilterData,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Island = Box2D.Dynamics.b2Island,
      b2TimeStep = Box2D.Dynamics.b2TimeStep,
      b2World = Box2D.Dynamics.b2World;

   Box2D.inherit(b2DistanceJoint, Box2D.Dynamics.Joints.b2Joint);
   b2DistanceJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2DistanceJoint.b2DistanceJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_u = new b2Vec2();
   };
   b2DistanceJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2DistanceJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2DistanceJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y);
   }
   b2DistanceJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2DistanceJoint.prototype.GetLength = function () {
      return this.m_length;
   }
   b2DistanceJoint.prototype.SetLength = function (length) {
      if (length === undefined) length = 0;
      this.m_length = length;
   }
   b2DistanceJoint.prototype.GetFrequency = function () {
      return this.m_frequencyHz;
   }
   b2DistanceJoint.prototype.SetFrequency = function (hz) {
      if (hz === undefined) hz = 0;
      this.m_frequencyHz = hz;
   }
   b2DistanceJoint.prototype.GetDampingRatio = function () {
      return this.m_dampingRatio;
   }
   b2DistanceJoint.prototype.SetDampingRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_dampingRatio = ratio;
   }
   b2DistanceJoint.prototype.b2DistanceJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_length = def.length;
      this.m_frequencyHz = def.frequencyHz;
      this.m_dampingRatio = def.dampingRatio;
      this.m_impulse = 0.0;
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
   }
   b2DistanceJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
      if (length > b2Settings.b2_linearSlop) {
         this.m_u.Multiply(1.0 / length);
      }
      else {
         this.m_u.SetZero();
      }
      var cr1u = (r1X * this.m_u.y - r1Y * this.m_u.x);
      var cr2u = (r2X * this.m_u.y - r2Y * this.m_u.x);
      var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
      this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
      if (this.m_frequencyHz > 0.0) {
         var C = length - this.m_length;
         var omega = 2.0 * Math.PI * this.m_frequencyHz;
         var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
         var k = this.m_mass * omega * omega;
         this.m_gamma = step.dt * (d + step.dt * k);
         this.m_gamma = this.m_gamma != 0.0 ? 1 / this.m_gamma : 0.0;
         this.m_bias = C * step.dt * k * this.m_gamma;
         this.m_mass = invMass + this.m_gamma;
         this.m_mass = this.m_mass != 0.0 ? 1.0 / this.m_mass : 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse *= step.dtRatio;
         var PX = this.m_impulse * this.m_u.x;
         var PY = this.m_impulse * this.m_u.y;
         bA.m_linearVelocity.x -= bA.m_invMass * PX;
         bA.m_linearVelocity.y -= bA.m_invMass * PY;
         bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
         bB.m_linearVelocity.x += bB.m_invMass * PX;
         bB.m_linearVelocity.y += bB.m_invMass * PY;
         bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
      }
      else {
         this.m_impulse = 0.0;
      }
   }
   b2DistanceJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
      var v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
      var v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
      var v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
      var Cdot = (this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y));
      var impulse = (-this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse));
      this.m_impulse += impulse;
      var PX = impulse * this.m_u.x;
      var PY = impulse * this.m_u.y;
      bA.m_linearVelocity.x -= bA.m_invMass * PX;
      bA.m_linearVelocity.y -= bA.m_invMass * PY;
      bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
      bB.m_linearVelocity.x += bB.m_invMass * PX;
      bB.m_linearVelocity.y += bB.m_invMass * PY;
      bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
   }
   b2DistanceJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var tMat;
      if (this.m_frequencyHz > 0.0) {
         return true;
      }
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      var length = Math.sqrt(dX * dX + dY * dY);
      dX /= length;
      dY /= length;
      var C = length - this.m_length;
      C = b2Math.Clamp(C, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
      var impulse = (-this.m_mass * C);
      this.m_u.Set(dX, dY);
      var PX = impulse * this.m_u.x;
      var PY = impulse * this.m_u.y;
      bA.m_sweep.c.x -= bA.m_invMass * PX;
      bA.m_sweep.c.y -= bA.m_invMass * PY;
      bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
      bB.m_sweep.c.x += bB.m_invMass * PX;
      bB.m_sweep.c.y += bB.m_invMass * PY;
      bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return b2Math.Abs(C) < b2Settings.b2_linearSlop;
   }
   Box2D.inherit(b2DistanceJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2DistanceJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2DistanceJointDef.b2DistanceJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
   };
   b2DistanceJointDef.prototype.b2DistanceJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_distanceJoint;
      this.length = 1.0;
      this.frequencyHz = 0.0;
      this.dampingRatio = 0.0;
   }
   b2DistanceJointDef.prototype.Initialize = function (bA, bB, anchorA, anchorB) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
      var dX = anchorB.x - anchorA.x;
      var dY = anchorB.y - anchorA.y;
      this.length = Math.sqrt(dX * dX + dY * dY);
      this.frequencyHz = 0.0;
      this.dampingRatio = 0.0;
   }
   Box2D.inherit(b2FrictionJoint, Box2D.Dynamics.Joints.b2Joint);
   b2FrictionJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2FrictionJoint.b2FrictionJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchorA = new b2Vec2();
      this.m_localAnchorB = new b2Vec2();
      this.m_linearMass = new b2Mat22();
      this.m_linearImpulse = new b2Vec2();
   };
   b2FrictionJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
   }
   b2FrictionJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
   }
   b2FrictionJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y);
   }
   b2FrictionJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_angularImpulse;
   }
   b2FrictionJoint.prototype.SetMaxForce = function (force) {
      if (force === undefined) force = 0;
      this.m_maxForce = force;
   }
   b2FrictionJoint.prototype.GetMaxForce = function () {
      return this.m_maxForce;
   }
   b2FrictionJoint.prototype.SetMaxTorque = function (torque) {
      if (torque === undefined) torque = 0;
      this.m_maxTorque = torque;
   }
   b2FrictionJoint.prototype.GetMaxTorque = function () {
      return this.m_maxTorque;
   }
   b2FrictionJoint.prototype.b2FrictionJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchorA.SetV(def.localAnchorA);
      this.m_localAnchorB.SetV(def.localAnchorB);
      this.m_linearMass.SetZero();
      this.m_angularMass = 0.0;
      this.m_linearImpulse.SetZero();
      this.m_angularImpulse = 0.0;
      this.m_maxForce = def.maxForce;
      this.m_maxTorque = def.maxTorque;
   }
   b2FrictionJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      var K = new b2Mat22();
      K.col1.x = mA + mB;
      K.col2.x = 0.0;
      K.col1.y = 0.0;
      K.col2.y = mA + mB;
      K.col1.x += iA * rAY * rAY;
      K.col2.x += (-iA * rAX * rAY);
      K.col1.y += (-iA * rAX * rAY);
      K.col2.y += iA * rAX * rAX;
      K.col1.x += iB * rBY * rBY;
      K.col2.x += (-iB * rBX * rBY);
      K.col1.y += (-iB * rBX * rBY);
      K.col2.y += iB * rBX * rBX;
      K.GetInverse(this.m_linearMass);
      this.m_angularMass = iA + iB;
      if (this.m_angularMass > 0.0) {
         this.m_angularMass = 1.0 / this.m_angularMass;
      }
      if (step.warmStarting) {
         this.m_linearImpulse.x *= step.dtRatio;
         this.m_linearImpulse.y *= step.dtRatio;
         this.m_angularImpulse *= step.dtRatio;
         var P = this.m_linearImpulse;
         bA.m_linearVelocity.x -= mA * P.x;
         bA.m_linearVelocity.y -= mA * P.y;
         bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
         bB.m_linearVelocity.x += mB * P.x;
         bB.m_linearVelocity.y += mB * P.y;
         bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse);
      }
      else {
         this.m_linearImpulse.SetZero();
         this.m_angularImpulse = 0.0;
      }
   }
   b2FrictionJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var vA = bA.m_linearVelocity;
      var wA = bA.m_angularVelocity;
      var vB = bB.m_linearVelocity;
      var wB = bB.m_angularVelocity;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var maxImpulse = 0; {
         var Cdot = wB - wA;
         var impulse = (-this.m_angularMass * Cdot);
         var oldImpulse = this.m_angularImpulse;
         maxImpulse = step.dt * this.m_maxTorque;
         this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_angularImpulse - oldImpulse;
         wA -= iA * impulse;
         wB += iB * impulse;
      } {
         var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
         var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
         var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2((-CdotX), (-CdotY)));
         var oldImpulseV = this.m_linearImpulse.Copy();
         this.m_linearImpulse.Add(impulseV);
         maxImpulse = step.dt * this.m_maxForce;
         if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.Normalize();
            this.m_linearImpulse.Multiply(maxImpulse);
         }
         impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
         vA.x -= mA * impulseV.x;
         vA.y -= mA * impulseV.y;
         wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
         vB.x += mB * impulseV.x;
         vB.y += mB * impulseV.y;
         wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
      }
      bA.m_angularVelocity = wA;
      bB.m_angularVelocity = wB;
   }
   b2FrictionJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return true;
   }
   Box2D.inherit(b2FrictionJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2FrictionJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2FrictionJointDef.b2FrictionJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
   };
   b2FrictionJointDef.prototype.b2FrictionJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_frictionJoint;
      this.maxForce = 0.0;
      this.maxTorque = 0.0;
   }
   b2FrictionJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
   }
   Box2D.inherit(b2GearJoint, Box2D.Dynamics.Joints.b2Joint);
   b2GearJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2GearJoint.b2GearJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_groundAnchor1 = new b2Vec2();
      this.m_groundAnchor2 = new b2Vec2();
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_J = new b2Jacobian();
   };
   b2GearJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2GearJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2GearJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y);
   }
   b2GearJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      var tMat = this.m_bodyB.m_xf.R;
      var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
      var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
      var tX = tMat.col1.x * rX + tMat.col2.x * rY;
      rY = tMat.col1.y * rX + tMat.col2.y * rY;
      rX = tX;
      var PX = this.m_impulse * this.m_J.linearB.x;
      var PY = this.m_impulse * this.m_J.linearB.y;
      return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX);
   }
   b2GearJoint.prototype.GetRatio = function () {
      return this.m_ratio;
   }
   b2GearJoint.prototype.SetRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_ratio = ratio;
   }
   b2GearJoint.prototype.b2GearJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var type1 = parseInt(def.joint1.m_type);
      var type2 = parseInt(def.joint2.m_type);
      this.m_revolute1 = null;
      this.m_prismatic1 = null;
      this.m_revolute2 = null;
      this.m_prismatic2 = null;
      var coordinate1 = 0;
      var coordinate2 = 0;
      this.m_ground1 = def.joint1.GetBodyA();
      this.m_bodyA = def.joint1.GetBodyB();
      if (type1 == b2Joint.e_revoluteJoint) {
         this.m_revolute1 = (def.joint1 instanceof b2RevoluteJoint ? def.joint1 : null);
         this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
         this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
         coordinate1 = this.m_revolute1.GetJointAngle();
      }
      else {
         this.m_prismatic1 = (def.joint1 instanceof b2PrismaticJoint ? def.joint1 : null);
         this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
         this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
         coordinate1 = this.m_prismatic1.GetJointTranslation();
      }
      this.m_ground2 = def.joint2.GetBodyA();
      this.m_bodyB = def.joint2.GetBodyB();
      if (type2 == b2Joint.e_revoluteJoint) {
         this.m_revolute2 = (def.joint2 instanceof b2RevoluteJoint ? def.joint2 : null);
         this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
         this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
         coordinate2 = this.m_revolute2.GetJointAngle();
      }
      else {
         this.m_prismatic2 = (def.joint2 instanceof b2PrismaticJoint ? def.joint2 : null);
         this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
         this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
         coordinate2 = this.m_prismatic2.GetJointTranslation();
      }
      this.m_ratio = def.ratio;
      this.m_constant = coordinate1 + this.m_ratio * coordinate2;
      this.m_impulse = 0.0;
   }
   b2GearJoint.prototype.InitVelocityConstraints = function (step) {
      var g1 = this.m_ground1;
      var g2 = this.m_ground2;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var ugX = 0;
      var ugY = 0;
      var rX = 0;
      var rY = 0;
      var tMat;
      var tVec;
      var crug = 0;
      var tX = 0;
      var K = 0.0;
      this.m_J.SetZero();
      if (this.m_revolute1) {
         this.m_J.angularA = (-1.0);
         K += bA.m_invI;
      }
      else {
         tMat = g1.m_xf.R;
         tVec = this.m_prismatic1.m_localXAxis1;
         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tMat = bA.m_xf.R;
         rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = tMat.col1.x * rX + tMat.col2.x * rY;
         rY = tMat.col1.y * rX + tMat.col2.y * rY;
         rX = tX;
         crug = rX * ugY - rY * ugX;
         this.m_J.linearA.Set((-ugX), (-ugY));
         this.m_J.angularA = (-crug);
         K += bA.m_invMass + bA.m_invI * crug * crug;
      }
      if (this.m_revolute2) {
         this.m_J.angularB = (-this.m_ratio);
         K += this.m_ratio * this.m_ratio * bB.m_invI;
      }
      else {
         tMat = g2.m_xf.R;
         tVec = this.m_prismatic2.m_localXAxis1;
         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
         tMat = bB.m_xf.R;
         rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = tMat.col1.x * rX + tMat.col2.x * rY;
         rY = tMat.col1.y * rX + tMat.col2.y * rY;
         rX = tX;
         crug = rX * ugY - rY * ugX;
         this.m_J.linearB.Set((-this.m_ratio * ugX), (-this.m_ratio * ugY));
         this.m_J.angularB = (-this.m_ratio * crug);
         K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug);
      }
      this.m_mass = K > 0.0 ? 1.0 / K : 0.0;
      if (step.warmStarting) {
         bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
         bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
         bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
         bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
         bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
         bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB;
      }
      else {
         this.m_impulse = 0.0;
      }
   }
   b2GearJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
      var impulse = (-this.m_mass * Cdot);
      this.m_impulse += impulse;
      bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
      bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
      bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
      bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
      bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
      bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB;
   }
   b2GearJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var linearError = 0.0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var coordinate1 = 0;
      var coordinate2 = 0;
      if (this.m_revolute1) {
         coordinate1 = this.m_revolute1.GetJointAngle();
      }
      else {
         coordinate1 = this.m_prismatic1.GetJointTranslation();
      }
      if (this.m_revolute2) {
         coordinate2 = this.m_revolute2.GetJointAngle();
      }
      else {
         coordinate2 = this.m_prismatic2.GetJointTranslation();
      }
      var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
      var impulse = (-this.m_mass * C);
      bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
      bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
      bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
      bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
      bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
      bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError < b2Settings.b2_linearSlop;
   }
   Box2D.inherit(b2GearJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2GearJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2GearJointDef.b2GearJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
   };
   b2GearJointDef.prototype.b2GearJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_gearJoint;
      this.joint1 = null;
      this.joint2 = null;
      this.ratio = 1.0;
   }
   b2Jacobian.b2Jacobian = function () {
      this.linearA = new b2Vec2();
      this.linearB = new b2Vec2();
   };
   b2Jacobian.prototype.SetZero = function () {
      this.linearA.SetZero();
      this.angularA = 0.0;
      this.linearB.SetZero();
      this.angularB = 0.0;
   }
   b2Jacobian.prototype.Set = function (x1, a1, x2, a2) {
      if (a1 === undefined) a1 = 0;
      if (a2 === undefined) a2 = 0;
      this.linearA.SetV(x1);
      this.angularA = a1;
      this.linearB.SetV(x2);
      this.angularB = a2;
   }
   b2Jacobian.prototype.Compute = function (x1, a1, x2, a2) {
      if (a1 === undefined) a1 = 0;
      if (a2 === undefined) a2 = 0;
      return (this.linearA.x * x1.x + this.linearA.y * x1.y) + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2;
   }
   b2Joint.b2Joint = function () {
      this.m_edgeA = new b2JointEdge();
      this.m_edgeB = new b2JointEdge();
      this.m_localCenterA = new b2Vec2();
      this.m_localCenterB = new b2Vec2();
   };
   b2Joint.prototype.GetType = function () {
      return this.m_type;
   }
   b2Joint.prototype.GetAnchorA = function () {
      return null;
   }
   b2Joint.prototype.GetAnchorB = function () {
      return null;
   }
   b2Joint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return null;
   }
   b2Joint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2Joint.prototype.GetBodyA = function () {
      return this.m_bodyA;
   }
   b2Joint.prototype.GetBodyB = function () {
      return this.m_bodyB;
   }
   b2Joint.prototype.GetNext = function () {
      return this.m_next;
   }
   b2Joint.prototype.GetUserData = function () {
      return this.m_userData;
   }
   b2Joint.prototype.SetUserData = function (data) {
      this.m_userData = data;
   }
   b2Joint.prototype.IsActive = function () {
      return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
   }
   b2Joint.Create = function (def, allocator) {
      var joint = null;
      switch (def.type) {
      case b2Joint.e_distanceJoint:
         {
            joint = new b2DistanceJoint((def instanceof b2DistanceJointDef ? def : null));
         }
         break;
      case b2Joint.e_mouseJoint:
         {
            joint = new b2MouseJoint((def instanceof b2MouseJointDef ? def : null));
         }
         break;
      case b2Joint.e_prismaticJoint:
         {
            joint = new b2PrismaticJoint((def instanceof b2PrismaticJointDef ? def : null));
         }
         break;
      case b2Joint.e_revoluteJoint:
         {
            joint = new b2RevoluteJoint((def instanceof b2RevoluteJointDef ? def : null));
         }
         break;
      case b2Joint.e_pulleyJoint:
         {
            joint = new b2PulleyJoint((def instanceof b2PulleyJointDef ? def : null));
         }
         break;
      case b2Joint.e_gearJoint:
         {
            joint = new b2GearJoint((def instanceof b2GearJointDef ? def : null));
         }
         break;
      case b2Joint.e_lineJoint:
         {
            joint = new b2LineJoint((def instanceof b2LineJointDef ? def : null));
         }
         break;
      case b2Joint.e_weldJoint:
         {
            joint = new b2WeldJoint((def instanceof b2WeldJointDef ? def : null));
         }
         break;
      case b2Joint.e_frictionJoint:
         {
            joint = new b2FrictionJoint((def instanceof b2FrictionJointDef ? def : null));
         }
         break;
      default:
         break;
      }
      return joint;
   }
   b2Joint.Destroy = function (joint, allocator) {}
   b2Joint.prototype.b2Joint = function (def) {
      b2Settings.b2Assert(def.bodyA != def.bodyB);
      this.m_type = def.type;
      this.m_prev = null;
      this.m_next = null;
      this.m_bodyA = def.bodyA;
      this.m_bodyB = def.bodyB;
      this.m_collideConnected = def.collideConnected;
      this.m_islandFlag = false;
      this.m_userData = def.userData;
   }
   b2Joint.prototype.InitVelocityConstraints = function (step) {}
   b2Joint.prototype.SolveVelocityConstraints = function (step) {}
   b2Joint.prototype.FinalizeVelocityConstraints = function () {}
   b2Joint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return false;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
      Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
      Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
      Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
      Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
      Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
      Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
      Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
      Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
      Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
      Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
      Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
      Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
      Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3;
   });
   b2JointDef.b2JointDef = function () {};
   b2JointDef.prototype.b2JointDef = function () {
      this.type = b2Joint.e_unknownJoint;
      this.userData = null;
      this.bodyA = null;
      this.bodyB = null;
      this.collideConnected = false;
   }
   b2JointEdge.b2JointEdge = function () {};
   Box2D.inherit(b2LineJoint, Box2D.Dynamics.Joints.b2Joint);
   b2LineJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2LineJoint.b2LineJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_localXAxis1 = new b2Vec2();
      this.m_localYAxis1 = new b2Vec2();
      this.m_axis = new b2Vec2();
      this.m_perp = new b2Vec2();
      this.m_K = new b2Mat22();
      this.m_impulse = new b2Vec2();
   };
   b2LineJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2LineJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2LineJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
   }
   b2LineJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.y;
   }
   b2LineJoint.prototype.GetJointTranslation = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
      var dX = p2.x - p1.x;
      var dY = p2.y - p1.y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var translation = axis.x * dX + axis.y * dY;
      return translation;
   }
   b2LineJoint.prototype.GetJointSpeed = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var v1 = bA.m_linearVelocity;
      var v2 = bB.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var w2 = bB.m_angularVelocity;
      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
      return speed;
   }
   b2LineJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2LineJoint.prototype.EnableLimit = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableLimit = flag;
   }
   b2LineJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerTranslation;
   }
   b2LineJoint.prototype.GetUpperLimit = function () {
      return this.m_upperTranslation;
   }
   b2LineJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_lowerTranslation = lower;
      this.m_upperTranslation = upper;
   }
   b2LineJoint.prototype.IsMotorEnabled = function () {
      return this.m_enableMotor;
   }
   b2LineJoint.prototype.EnableMotor = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableMotor = flag;
   }
   b2LineJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2LineJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2LineJoint.prototype.SetMaxMotorForce = function (force) {
      if (force === undefined) force = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_maxMotorForce = force;
   }
   b2LineJoint.prototype.GetMaxMotorForce = function () {
      return this.m_maxMotorForce;
   }
   b2LineJoint.prototype.GetMotorForce = function () {
      return this.m_motorImpulse;
   }
   b2LineJoint.prototype.b2LineJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_localXAxis1.SetV(def.localAxisA);
      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
      this.m_localYAxis1.y = this.m_localXAxis1.x;
      this.m_impulse.SetZero();
      this.m_motorMass = 0.0;
      this.m_motorImpulse = 0.0;
      this.m_lowerTranslation = def.lowerTranslation;
      this.m_upperTranslation = def.upperTranslation;
      this.m_maxMotorForce = def.maxMotorForce;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
      this.m_axis.SetZero();
      this.m_perp.SetZero();
   }
   b2LineJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      this.m_localCenterA.SetV(bA.GetLocalCenter());
      this.m_localCenterB.SetV(bB.GetLocalCenter());
      var xf1 = bA.GetTransform();
      var xf2 = bB.GetTransform();
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      this.m_invMassA = bA.m_invMass;
      this.m_invMassB = bB.m_invMass;
      this.m_invIA = bA.m_invI;
      this.m_invIB = bB.m_invI; {
         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
         this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1.0 / this.m_motorMass : 0.0;
      } {
         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
         var m1 = this.m_invMassA;
         var m2 = this.m_invMassB;
         var i1 = this.m_invIA;
         var i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
      }
      if (this.m_enableLimit) {
         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_limitState = b2Joint.e_atLowerLimit;
               this.m_impulse.y = 0.0;
            }
         }
         else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_limitState = b2Joint.e_atUpperLimit;
               this.m_impulse.y = 0.0;
            }
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.y = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
         var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
         var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
         bA.m_linearVelocity.x -= this.m_invMassA * PX;
         bA.m_linearVelocity.y -= this.m_invMassA * PY;
         bA.m_angularVelocity -= this.m_invIA * L1;
         bB.m_linearVelocity.x += this.m_invMassB * PX;
         bB.m_linearVelocity.y += this.m_invMassB * PY;
         bB.m_angularVelocity += this.m_invIB * L2;
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2LineJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var PX = 0;
      var PY = 0;
      var L1 = 0;
      var L2 = 0;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorForce;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         PX = impulse * this.m_axis.x;
         PY = impulse * this.m_axis.y;
         L1 = impulse * this.m_a1;
         L2 = impulse * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var f1 = this.m_impulse.Copy();
         var df = this.m_K.Solve(new b2Vec2(), (-Cdot1), (-Cdot2));
         this.m_impulse.Add(df);
         if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0.0);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0.0);
         }
         var b = (-Cdot1) - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
         var f2r = 0;
         if (this.m_K.col1.x != 0.0) {
            f2r = b / this.m_K.col1.x + f1.x;
         }
         else {
            f2r = f1.x;
         }
         this.m_impulse.x = f2r;
         df.x = this.m_impulse.x - f1.x;
         df.y = this.m_impulse.y - f1.y;
         PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
         PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
         L1 = df.x * this.m_s1 + df.y * this.m_a1;
         L2 = df.x * this.m_s2 + df.y * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      else {
         var df2 = 0;
         if (this.m_K.col1.x != 0.0) {
            df2 = ((-Cdot1)) / this.m_K.col1.x;
         }
         else {
            df2 = 0.0;
         }
         this.m_impulse.x += df2;
         PX = df2 * this.m_perp.x;
         PY = df2 * this.m_perp.y;
         L1 = df2 * this.m_s1;
         L2 = df2 * this.m_s2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2LineJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var limitC = 0;
      var oldLimitImpulse = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var c1 = bA.m_sweep.c;
      var a1 = bA.m_sweep.a;
      var c2 = bB.m_sweep.c;
      var a2 = bB.m_sweep.a;
      var tMat;
      var tX = 0;
      var m1 = 0;
      var m2 = 0;
      var i1 = 0;
      var i2 = 0;
      var linearError = 0.0;
      var angularError = 0.0;
      var active = false;
      var C2 = 0.0;
      var R1 = b2Mat22.FromAngle(a1);
      var R2 = b2Mat22.FromAngle(a2);
      tMat = R1;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = R2;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = c2.x + r2X - c1.x - r1X;
      var dY = c2.y + r2Y - c1.y - r1Y;
      if (this.m_enableLimit) {
         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
         }
         else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
         }
         else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
         }
      }
      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
      var impulse = new b2Vec2();
      var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
      linearError = b2Math.Max(linearError, b2Math.Abs(C1));
      angularError = 0.0;
      if (active) {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
         this.m_K.Solve(impulse, (-C1), (-C2));
      }
      else {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         var impulse1 = 0;
         if (k11 != 0.0) {
            impulse1 = ((-C1)) / k11;
         }
         else {
            impulse1 = 0.0;
         }
         impulse.x = impulse1;
         impulse.y = 0.0;
      }
      var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
      var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
      var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
      var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
      c1.x -= this.m_invMassA * PX;
      c1.y -= this.m_invMassA * PY;
      a1 -= this.m_invIA * L1;
      c2.x += this.m_invMassB * PX;
      c2.y += this.m_invMassB * PY;
      a2 += this.m_invIB * L2;
      bA.m_sweep.a = a1;
      bB.m_sweep.a = a2;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2LineJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2LineJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2LineJointDef.b2LineJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
      this.localAxisA = new b2Vec2();
   };
   b2LineJointDef.prototype.b2LineJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_lineJoint;
      this.localAxisA.Set(1.0, 0.0);
      this.enableLimit = false;
      this.lowerTranslation = 0.0;
      this.upperTranslation = 0.0;
      this.enableMotor = false;
      this.maxMotorForce = 0.0;
      this.motorSpeed = 0.0;
   }
   b2LineJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.localAxisA = this.bodyA.GetLocalVector(axis);
   }
   Box2D.inherit(b2MouseJoint, Box2D.Dynamics.Joints.b2Joint);
   b2MouseJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2MouseJoint.b2MouseJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.K = new b2Mat22();
      this.K1 = new b2Mat22();
      this.K2 = new b2Mat22();
      this.m_localAnchor = new b2Vec2();
      this.m_target = new b2Vec2();
      this.m_impulse = new b2Vec2();
      this.m_mass = new b2Mat22();
      this.m_C = new b2Vec2();
   };
   b2MouseJoint.prototype.GetAnchorA = function () {
      return this.m_target;
   }
   b2MouseJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor);
   }
   b2MouseJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2MouseJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2MouseJoint.prototype.GetTarget = function () {
      return this.m_target;
   }
   b2MouseJoint.prototype.SetTarget = function (target) {
      if (this.m_bodyB.IsAwake() == false) {
         this.m_bodyB.SetAwake(true);
      }
      this.m_target = target;
   }
   b2MouseJoint.prototype.GetMaxForce = function () {
      return this.m_maxForce;
   }
   b2MouseJoint.prototype.SetMaxForce = function (maxForce) {
      if (maxForce === undefined) maxForce = 0;
      this.m_maxForce = maxForce;
   }
   b2MouseJoint.prototype.GetFrequency = function () {
      return this.m_frequencyHz;
   }
   b2MouseJoint.prototype.SetFrequency = function (hz) {
      if (hz === undefined) hz = 0;
      this.m_frequencyHz = hz;
   }
   b2MouseJoint.prototype.GetDampingRatio = function () {
      return this.m_dampingRatio;
   }
   b2MouseJoint.prototype.SetDampingRatio = function (ratio) {
      if (ratio === undefined) ratio = 0;
      this.m_dampingRatio = ratio;
   }
   b2MouseJoint.prototype.b2MouseJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_target.SetV(def.target);
      var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
      var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
      var tMat = this.m_bodyB.m_xf.R;
      this.m_localAnchor.x = (tX * tMat.col1.x + tY * tMat.col1.y);
      this.m_localAnchor.y = (tX * tMat.col2.x + tY * tMat.col2.y);
      this.m_maxForce = def.maxForce;
      this.m_impulse.SetZero();
      this.m_frequencyHz = def.frequencyHz;
      this.m_dampingRatio = def.dampingRatio;
      this.m_beta = 0.0;
      this.m_gamma = 0.0;
   }
   b2MouseJoint.prototype.InitVelocityConstraints = function (step) {
      var b = this.m_bodyB;
      var mass = b.GetMass();
      var omega = 2.0 * Math.PI * this.m_frequencyHz;
      var d = 2.0 * mass * this.m_dampingRatio * omega;
      var k = mass * omega * omega;
      this.m_gamma = step.dt * (d + step.dt * k);
      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0.0;
      this.m_beta = step.dt * k * this.m_gamma;
      var tMat;tMat = b.m_xf.R;
      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * rX + tMat.col2.x * rY);rY = (tMat.col1.y * rX + tMat.col2.y * rY);
      rX = tX;
      var invMass = b.m_invMass;
      var invI = b.m_invI;this.K1.col1.x = invMass;
      this.K1.col2.x = 0.0;
      this.K1.col1.y = 0.0;
      this.K1.col2.y = invMass;
      this.K2.col1.x = invI * rY * rY;
      this.K2.col2.x = (-invI * rX * rY);
      this.K2.col1.y = (-invI * rX * rY);
      this.K2.col2.y = invI * rX * rX;
      this.K.SetM(this.K1);
      this.K.AddM(this.K2);
      this.K.col1.x += this.m_gamma;
      this.K.col2.y += this.m_gamma;
      this.K.GetInverse(this.m_mass);
      this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
      this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
      b.m_angularVelocity *= 0.98;
      this.m_impulse.x *= step.dtRatio;
      this.m_impulse.y *= step.dtRatio;
      b.m_linearVelocity.x += invMass * this.m_impulse.x;
      b.m_linearVelocity.y += invMass * this.m_impulse.y;
      b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x);
   }
   b2MouseJoint.prototype.SolveVelocityConstraints = function (step) {
      var b = this.m_bodyB;
      var tMat;
      var tX = 0;
      var tY = 0;
      tMat = b.m_xf.R;
      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rX + tMat.col2.x * rY);
      rY = (tMat.col1.y * rX + tMat.col2.y * rY);
      rX = tX;
      var CdotX = b.m_linearVelocity.x + ((-b.m_angularVelocity * rY));
      var CdotY = b.m_linearVelocity.y + (b.m_angularVelocity * rX);
      tMat = this.m_mass;
      tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
      tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
      var impulseX = (-(tMat.col1.x * tX + tMat.col2.x * tY));
      var impulseY = (-(tMat.col1.y * tX + tMat.col2.y * tY));
      var oldImpulseX = this.m_impulse.x;
      var oldImpulseY = this.m_impulse.y;
      this.m_impulse.x += impulseX;
      this.m_impulse.y += impulseY;
      var maxImpulse = step.dt * this.m_maxForce;
      if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
         this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
      }
      impulseX = this.m_impulse.x - oldImpulseX;
      impulseY = this.m_impulse.y - oldImpulseY;
      b.m_linearVelocity.x += b.m_invMass * impulseX;
      b.m_linearVelocity.y += b.m_invMass * impulseY;
      b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX);
   }
   b2MouseJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      return true;
   }
   Box2D.inherit(b2MouseJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2MouseJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2MouseJointDef.b2MouseJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.target = new b2Vec2();
   };
   b2MouseJointDef.prototype.b2MouseJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_mouseJoint;
      this.maxForce = 0.0;
      this.frequencyHz = 5.0;
      this.dampingRatio = 0.7;
   }
   Box2D.inherit(b2PrismaticJoint, Box2D.Dynamics.Joints.b2Joint);
   b2PrismaticJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2PrismaticJoint.b2PrismaticJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_localXAxis1 = new b2Vec2();
      this.m_localYAxis1 = new b2Vec2();
      this.m_axis = new b2Vec2();
      this.m_perp = new b2Vec2();
      this.m_K = new b2Mat33();
      this.m_impulse = new b2Vec3();
   };
   b2PrismaticJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2PrismaticJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2PrismaticJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
   }
   b2PrismaticJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.y;
   }
   b2PrismaticJoint.prototype.GetJointTranslation = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
      var dX = p2.x - p1.x;
      var dY = p2.y - p1.y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var translation = axis.x * dX + axis.y * dY;
      return translation;
   }
   b2PrismaticJoint.prototype.GetJointSpeed = function () {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var dX = p2X - p1X;
      var dY = p2Y - p1Y;
      var axis = bA.GetWorldVector(this.m_localXAxis1);
      var v1 = bA.m_linearVelocity;
      var v2 = bB.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var w2 = bB.m_angularVelocity;
      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
      return speed;
   }
   b2PrismaticJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2PrismaticJoint.prototype.EnableLimit = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableLimit = flag;
   }
   b2PrismaticJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerTranslation;
   }
   b2PrismaticJoint.prototype.GetUpperLimit = function () {
      return this.m_upperTranslation;
   }
   b2PrismaticJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_lowerTranslation = lower;
      this.m_upperTranslation = upper;
   }
   b2PrismaticJoint.prototype.IsMotorEnabled = function () {
      return this.m_enableMotor;
   }
   b2PrismaticJoint.prototype.EnableMotor = function (flag) {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_enableMotor = flag;
   }
   b2PrismaticJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2PrismaticJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2PrismaticJoint.prototype.SetMaxMotorForce = function (force) {
      if (force === undefined) force = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_maxMotorForce = force;
   }
   b2PrismaticJoint.prototype.GetMotorForce = function () {
      return this.m_motorImpulse;
   }
   b2PrismaticJoint.prototype.b2PrismaticJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_localXAxis1.SetV(def.localAxisA);
      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
      this.m_localYAxis1.y = this.m_localXAxis1.x;
      this.m_refAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_motorMass = 0.0;
      this.m_motorImpulse = 0.0;
      this.m_lowerTranslation = def.lowerTranslation;
      this.m_upperTranslation = def.upperTranslation;
      this.m_maxMotorForce = def.maxMotorForce;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
      this.m_axis.SetZero();
      this.m_perp.SetZero();
   }
   b2PrismaticJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      this.m_localCenterA.SetV(bA.GetLocalCenter());
      this.m_localCenterB.SetV(bB.GetLocalCenter());
      var xf1 = bA.GetTransform();
      var xf2 = bB.GetTransform();
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
      this.m_invMassA = bA.m_invMass;
      this.m_invMassB = bB.m_invMass;
      this.m_invIA = bA.m_invI;
      this.m_invIB = bB.m_invI; {
         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
         if (this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1.0 / this.m_motorMass;
      } {
         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
         var m1 = this.m_invMassA;
         var m2 = this.m_invMassB;
         var i1 = this.m_invIA;
         var i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = i1 + i2;
         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
         this.m_K.col3.x = this.m_K.col1.z;
         this.m_K.col3.y = this.m_K.col2.z;
         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
      }
      if (this.m_enableLimit) {
         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_limitState = b2Joint.e_atLowerLimit;
               this.m_impulse.z = 0.0;
            }
         }
         else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_limitState = b2Joint.e_atUpperLimit;
               this.m_impulse.z = 0.0;
            }
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
         var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
         var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
         bA.m_linearVelocity.x -= this.m_invMassA * PX;
         bA.m_linearVelocity.y -= this.m_invMassA * PY;
         bA.m_angularVelocity -= this.m_invIA * L1;
         bB.m_linearVelocity.x += this.m_invMassB * PX;
         bB.m_linearVelocity.y += this.m_invMassB * PY;
         bB.m_angularVelocity += this.m_invIB * L2;
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2PrismaticJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var PX = 0;
      var PY = 0;
      var L1 = 0;
      var L2 = 0;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorForce;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         PX = impulse * this.m_axis.x;
         PY = impulse * this.m_axis.y;
         L1 = impulse * this.m_a1;
         L2 = impulse * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
      var Cdot1Y = w2 - w1;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
         var f1 = this.m_impulse.Copy();
         var df = this.m_K.Solve33(new b2Vec3(), (-Cdot1X), (-Cdot1Y), (-Cdot2));
         this.m_impulse.Add(df);
         if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0.0);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0.0);
         }
         var bX = (-Cdot1X) - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
         var bY = (-Cdot1Y) - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
         var f2r = this.m_K.Solve22(new b2Vec2(), bX, bY);
         f2r.x += f1.x;
         f2r.y += f1.y;
         this.m_impulse.x = f2r.x;
         this.m_impulse.y = f2r.y;
         df.x = this.m_impulse.x - f1.x;
         df.y = this.m_impulse.y - f1.y;
         df.z = this.m_impulse.z - f1.z;
         PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
         PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
         L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
         L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      else {
         var df2 = this.m_K.Solve22(new b2Vec2(), (-Cdot1X), (-Cdot1Y));
         this.m_impulse.x += df2.x;
         this.m_impulse.y += df2.y;
         PX = df2.x * this.m_perp.x;
         PY = df2.x * this.m_perp.y;
         L1 = df2.x * this.m_s1 + df2.y;
         L2 = df2.x * this.m_s2 + df2.y;
         v1.x -= this.m_invMassA * PX;
         v1.y -= this.m_invMassA * PY;
         w1 -= this.m_invIA * L1;
         v2.x += this.m_invMassB * PX;
         v2.y += this.m_invMassB * PY;
         w2 += this.m_invIB * L2;
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2PrismaticJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var limitC = 0;
      var oldLimitImpulse = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var c1 = bA.m_sweep.c;
      var a1 = bA.m_sweep.a;
      var c2 = bB.m_sweep.c;
      var a2 = bB.m_sweep.a;
      var tMat;
      var tX = 0;
      var m1 = 0;
      var m2 = 0;
      var i1 = 0;
      var i2 = 0;
      var linearError = 0.0;
      var angularError = 0.0;
      var active = false;
      var C2 = 0.0;
      var R1 = b2Mat22.FromAngle(a1);
      var R2 = b2Mat22.FromAngle(a2);
      tMat = R1;
      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = R2;
      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var dX = c2.x + r2X - c1.x - r1X;
      var dY = c2.y + r2Y - c1.y - r1Y;
      if (this.m_enableLimit) {
         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
         }
         else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
         }
         else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
         }
      }
      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
      var impulse = new b2Vec3();
      var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
      var C1Y = a2 - a1 - this.m_refAngle;
      linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
      angularError = b2Math.Abs(C1Y);
      if (active) {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
         this.m_K.col2.x = this.m_K.col1.y;
         this.m_K.col2.y = i1 + i2;
         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
         this.m_K.col3.x = this.m_K.col1.z;
         this.m_K.col3.y = this.m_K.col2.z;
         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
         this.m_K.Solve33(impulse, (-C1X), (-C1Y), (-C2));
      }
      else {
         m1 = this.m_invMassA;
         m2 = this.m_invMassB;
         i1 = this.m_invIA;
         i2 = this.m_invIB;
         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
         var k12 = i1 * this.m_s1 + i2 * this.m_s2;
         var k22 = i1 + i2;
         this.m_K.col1.Set(k11, k12, 0.0);
         this.m_K.col2.Set(k12, k22, 0.0);
         var impulse1 = this.m_K.Solve22(new b2Vec2(), (-C1X), (-C1Y));
         impulse.x = impulse1.x;
         impulse.y = impulse1.y;
         impulse.z = 0.0;
      }
      var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
      var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
      var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
      var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
      c1.x -= this.m_invMassA * PX;
      c1.y -= this.m_invMassA * PY;
      a1 -= this.m_invIA * L1;
      c2.x += this.m_invMassB * PX;
      c2.y += this.m_invMassB * PY;
      a2 += this.m_invIB * L2;
      bA.m_sweep.a = a1;
      bB.m_sweep.a = a2;
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2PrismaticJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2PrismaticJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2PrismaticJointDef.b2PrismaticJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
      this.localAxisA = new b2Vec2();
   };
   b2PrismaticJointDef.prototype.b2PrismaticJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_prismaticJoint;
      this.localAxisA.Set(1.0, 0.0);
      this.referenceAngle = 0.0;
      this.enableLimit = false;
      this.lowerTranslation = 0.0;
      this.upperTranslation = 0.0;
      this.enableMotor = false;
      this.maxMotorForce = 0.0;
      this.motorSpeed = 0.0;
   }
   b2PrismaticJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.localAxisA = this.bodyA.GetLocalVector(axis);
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
   Box2D.inherit(b2PulleyJoint, Box2D.Dynamics.Joints.b2Joint);
   b2PulleyJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2PulleyJoint.b2PulleyJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_groundAnchor1 = new b2Vec2();
      this.m_groundAnchor2 = new b2Vec2();
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_u1 = new b2Vec2();
      this.m_u2 = new b2Vec2();
   };
   b2PulleyJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2PulleyJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2PulleyJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y);
   }
   b2PulleyJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return 0.0;
   }
   b2PulleyJoint.prototype.GetGroundAnchorA = function () {
      var a = this.m_ground.m_xf.position.Copy();
      a.Add(this.m_groundAnchor1);
      return a;
   }
   b2PulleyJoint.prototype.GetGroundAnchorB = function () {
      var a = this.m_ground.m_xf.position.Copy();
      a.Add(this.m_groundAnchor2);
      return a;
   }
   b2PulleyJoint.prototype.GetLength1 = function () {
      var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var dX = p.x - sX;
      var dY = p.y - sY;
      return Math.sqrt(dX * dX + dY * dY);
   }
   b2PulleyJoint.prototype.GetLength2 = function () {
      var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      var dX = p.x - sX;
      var dY = p.y - sY;
      return Math.sqrt(dX * dX + dY * dY);
   }
   b2PulleyJoint.prototype.GetRatio = function () {
      return this.m_ratio;
   }
   b2PulleyJoint.prototype.b2PulleyJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      var tMat;
      var tX = 0;
      var tY = 0;
      this.m_ground = this.m_bodyA.m_world.m_groundBody;
      this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
      this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
      this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
      this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_ratio = def.ratio;
      this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
      this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
      this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
      this.m_impulse = 0.0;
      this.m_limitImpulse1 = 0.0;
      this.m_limitImpulse2 = 0.0;
   }
   b2PulleyJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var p1X = bA.m_sweep.c.x + r1X;
      var p1Y = bA.m_sweep.c.y + r1Y;
      var p2X = bB.m_sweep.c.x + r2X;
      var p2Y = bB.m_sweep.c.y + r2Y;
      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      this.m_u1.Set(p1X - s1X, p1Y - s1Y);
      this.m_u2.Set(p2X - s2X, p2Y - s2Y);
      var length1 = this.m_u1.Length();
      var length2 = this.m_u2.Length();
      if (length1 > b2Settings.b2_linearSlop) {
         this.m_u1.Multiply(1.0 / length1);
      }
      else {
         this.m_u1.SetZero();
      }
      if (length2 > b2Settings.b2_linearSlop) {
         this.m_u2.Multiply(1.0 / length2);
      }
      else {
         this.m_u2.SetZero();
      }
      var C = this.m_constant - length1 - this.m_ratio * length2;
      if (C > 0.0) {
         this.m_state = b2Joint.e_inactiveLimit;
         this.m_impulse = 0.0;
      }
      else {
         this.m_state = b2Joint.e_atUpperLimit;
      }
      if (length1 < this.m_maxLength1) {
         this.m_limitState1 = b2Joint.e_inactiveLimit;
         this.m_limitImpulse1 = 0.0;
      }
      else {
         this.m_limitState1 = b2Joint.e_atUpperLimit;
      }
      if (length2 < this.m_maxLength2) {
         this.m_limitState2 = b2Joint.e_inactiveLimit;
         this.m_limitImpulse2 = 0.0;
      }
      else {
         this.m_limitState2 = b2Joint.e_atUpperLimit;
      }
      var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
      var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
      this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
      this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
      this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
      this.m_limitMass1 = 1.0 / this.m_limitMass1;
      this.m_limitMass2 = 1.0 / this.m_limitMass2;
      this.m_pulleyMass = 1.0 / this.m_pulleyMass;
      if (step.warmStarting) {
         this.m_impulse *= step.dtRatio;
         this.m_limitImpulse1 *= step.dtRatio;
         this.m_limitImpulse2 *= step.dtRatio;
         var P1X = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.x;
         var P1Y = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.y;
         var P2X = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.x;
         var P2Y = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.y;
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
      else {
         this.m_impulse = 0.0;
         this.m_limitImpulse1 = 0.0;
         this.m_limitImpulse2 = 0.0;
      }
   }
   b2PulleyJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var v1X = 0;
      var v1Y = 0;
      var v2X = 0;
      var v2Y = 0;
      var P1X = 0;
      var P1Y = 0;
      var P2X = 0;
      var P2Y = 0;
      var Cdot = 0;
      var impulse = 0;
      var oldImpulse = 0;
      if (this.m_state == b2Joint.e_atUpperLimit) {
         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y)) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
         impulse = this.m_pulleyMass * ((-Cdot));
         oldImpulse = this.m_impulse;
         this.m_impulse = b2Math.Max(0.0, this.m_impulse + impulse);
         impulse = this.m_impulse - oldImpulse;
         P1X = (-impulse * this.m_u1.x);
         P1Y = (-impulse * this.m_u1.y);
         P2X = (-this.m_ratio * impulse * this.m_u2.x);
         P2Y = (-this.m_ratio * impulse * this.m_u2.y);
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y));
         impulse = (-this.m_limitMass1 * Cdot);
         oldImpulse = this.m_limitImpulse1;
         this.m_limitImpulse1 = b2Math.Max(0.0, this.m_limitImpulse1 + impulse);
         impulse = this.m_limitImpulse1 - oldImpulse;
         P1X = (-impulse * this.m_u1.x);
         P1Y = (-impulse * this.m_u1.y);
         bA.m_linearVelocity.x += bA.m_invMass * P1X;
         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
      }
      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
         Cdot = (-(this.m_u2.x * v2X + this.m_u2.y * v2Y));
         impulse = (-this.m_limitMass2 * Cdot);
         oldImpulse = this.m_limitImpulse2;
         this.m_limitImpulse2 = b2Math.Max(0.0, this.m_limitImpulse2 + impulse);
         impulse = this.m_limitImpulse2 - oldImpulse;
         P2X = (-impulse * this.m_u2.x);
         P2Y = (-impulse * this.m_u2.y);
         bB.m_linearVelocity.x += bB.m_invMass * P2X;
         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
      }
   }
   b2PulleyJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
      var r1X = 0;
      var r1Y = 0;
      var r2X = 0;
      var r2Y = 0;
      var p1X = 0;
      var p1Y = 0;
      var p2X = 0;
      var p2Y = 0;
      var length1 = 0;
      var length2 = 0;
      var C = 0;
      var impulse = 0;
      var oldImpulse = 0;
      var oldLimitPositionImpulse = 0;
      var tX = 0;
      var linearError = 0.0;
      if (this.m_state == b2Joint.e_atUpperLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         p1X = bA.m_sweep.c.x + r1X;
         p1Y = bA.m_sweep.c.y + r1Y;
         p2X = bB.m_sweep.c.x + r2X;
         p2Y = bB.m_sweep.c.y + r2Y;
         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
         length1 = this.m_u1.Length();
         length2 = this.m_u2.Length();
         if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.Multiply(1.0 / length1);
         }
         else {
            this.m_u1.SetZero();
         }
         if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.Multiply(1.0 / length2);
         }
         else {
            this.m_u2.SetZero();
         }
         C = this.m_constant - length1 - this.m_ratio * length2;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_pulleyMass * C);
         p1X = (-impulse * this.m_u1.x);
         p1Y = (-impulse * this.m_u1.y);
         p2X = (-this.m_ratio * impulse * this.m_u2.x);
         p2Y = (-this.m_ratio * impulse * this.m_u2.y);
         bA.m_sweep.c.x += bA.m_invMass * p1X;
         bA.m_sweep.c.y += bA.m_invMass * p1Y;
         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
         bB.m_sweep.c.x += bB.m_invMass * p2X;
         bB.m_sweep.c.y += bB.m_invMass * p2Y;
         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      }
      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         p1X = bA.m_sweep.c.x + r1X;
         p1Y = bA.m_sweep.c.y + r1Y;
         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
         length1 = this.m_u1.Length();
         if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.x *= 1.0 / length1;
            this.m_u1.y *= 1.0 / length1;
         }
         else {
            this.m_u1.SetZero();
         }
         C = this.m_maxLength1 - length1;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_limitMass1 * C);
         p1X = (-impulse * this.m_u1.x);
         p1Y = (-impulse * this.m_u1.y);
         bA.m_sweep.c.x += bA.m_invMass * p1X;
         bA.m_sweep.c.y += bA.m_invMass * p1Y;
         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
         bA.SynchronizeTransform();
      }
      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         p2X = bB.m_sweep.c.x + r2X;
         p2Y = bB.m_sweep.c.y + r2Y;
         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
         length2 = this.m_u2.Length();
         if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.x *= 1.0 / length2;
            this.m_u2.y *= 1.0 / length2;
         }
         else {
            this.m_u2.SetZero();
         }
         C = this.m_maxLength2 - length2;
         linearError = b2Math.Max(linearError, (-C));
         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
         impulse = (-this.m_limitMass2 * C);
         p2X = (-impulse * this.m_u2.x);
         p2Y = (-impulse * this.m_u2.y);
         bB.m_sweep.c.x += bB.m_invMass * p2X;
         bB.m_sweep.c.y += bB.m_invMass * p2Y;
         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
         bB.SynchronizeTransform();
      }
      return linearError < b2Settings.b2_linearSlop;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2.0;
   });
   Box2D.inherit(b2PulleyJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2PulleyJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2PulleyJointDef.b2PulleyJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.groundAnchorA = new b2Vec2();
      this.groundAnchorB = new b2Vec2();
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
   };
   b2PulleyJointDef.prototype.b2PulleyJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_pulleyJoint;
      this.groundAnchorA.Set((-1.0), 1.0);
      this.groundAnchorB.Set(1.0, 1.0);
      this.localAnchorA.Set((-1.0), 0.0);
      this.localAnchorB.Set(1.0, 0.0);
      this.lengthA = 0.0;
      this.maxLengthA = 0.0;
      this.lengthB = 0.0;
      this.maxLengthB = 0.0;
      this.ratio = 1.0;
      this.collideConnected = true;
   }
   b2PulleyJointDef.prototype.Initialize = function (bA, bB, gaA, gaB, anchorA, anchorB, r) {
      if (r === undefined) r = 0;
      this.bodyA = bA;
      this.bodyB = bB;
      this.groundAnchorA.SetV(gaA);
      this.groundAnchorB.SetV(gaB);
      this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
      var d1X = anchorA.x - gaA.x;
      var d1Y = anchorA.y - gaA.y;
      this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
      var d2X = anchorB.x - gaB.x;
      var d2Y = anchorB.y - gaB.y;
      this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
      this.ratio = r;
      var C = this.lengthA + this.ratio * this.lengthB;
      this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
      this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio;
   }
   Box2D.inherit(b2RevoluteJoint, Box2D.Dynamics.Joints.b2Joint);
   b2RevoluteJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2RevoluteJoint.b2RevoluteJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.K = new b2Mat22();
      this.K1 = new b2Mat22();
      this.K2 = new b2Mat22();
      this.K3 = new b2Mat22();
      this.impulse3 = new b2Vec3();
      this.impulse2 = new b2Vec2();
      this.reduced = new b2Vec2();
      this.m_localAnchor1 = new b2Vec2();
      this.m_localAnchor2 = new b2Vec2();
      this.m_impulse = new b2Vec3();
      this.m_mass = new b2Mat33();
   };
   b2RevoluteJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
   }
   b2RevoluteJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
   }
   b2RevoluteJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2RevoluteJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.z;
   }
   b2RevoluteJoint.prototype.GetJointAngle = function () {
      return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
   }
   b2RevoluteJoint.prototype.GetJointSpeed = function () {
      return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
   }
   b2RevoluteJoint.prototype.IsLimitEnabled = function () {
      return this.m_enableLimit;
   }
   b2RevoluteJoint.prototype.EnableLimit = function (flag) {
      this.m_enableLimit = flag;
   }
   b2RevoluteJoint.prototype.GetLowerLimit = function () {
      return this.m_lowerAngle;
   }
   b2RevoluteJoint.prototype.GetUpperLimit = function () {
      return this.m_upperAngle;
   }
   b2RevoluteJoint.prototype.SetLimits = function (lower, upper) {
      if (lower === undefined) lower = 0;
      if (upper === undefined) upper = 0;
      this.m_lowerAngle = lower;
      this.m_upperAngle = upper;
   }
   b2RevoluteJoint.prototype.IsMotorEnabled = function () {
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      return this.m_enableMotor;
   }
   b2RevoluteJoint.prototype.EnableMotor = function (flag) {
      this.m_enableMotor = flag;
   }
   b2RevoluteJoint.prototype.SetMotorSpeed = function (speed) {
      if (speed === undefined) speed = 0;
      this.m_bodyA.SetAwake(true);
      this.m_bodyB.SetAwake(true);
      this.m_motorSpeed = speed;
   }
   b2RevoluteJoint.prototype.GetMotorSpeed = function () {
      return this.m_motorSpeed;
   }
   b2RevoluteJoint.prototype.SetMaxMotorTorque = function (torque) {
      if (torque === undefined) torque = 0;
      this.m_maxMotorTorque = torque;
   }
   b2RevoluteJoint.prototype.GetMotorTorque = function () {
      return this.m_maxMotorTorque;
   }
   b2RevoluteJoint.prototype.b2RevoluteJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchor1.SetV(def.localAnchorA);
      this.m_localAnchor2.SetV(def.localAnchorB);
      this.m_referenceAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_motorImpulse = 0.0;
      this.m_lowerAngle = def.lowerAngle;
      this.m_upperAngle = def.upperAngle;
      this.m_maxMotorTorque = def.maxMotorTorque;
      this.m_motorSpeed = def.motorSpeed;
      this.m_enableLimit = def.enableLimit;
      this.m_enableMotor = def.enableMotor;
      this.m_limitState = b2Joint.e_inactiveLimit;
   }
   b2RevoluteJoint.prototype.InitVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      if (this.m_enableMotor || this.m_enableLimit) {}
      tMat = bA.m_xf.R;
      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
      r1X = tX;
      tMat = bB.m_xf.R;
      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
      r2X = tX;
      var m1 = bA.m_invMass;
      var m2 = bB.m_invMass;
      var i1 = bA.m_invI;
      var i2 = bB.m_invI;
      this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
      this.m_mass.col2.x = (-r1Y * r1X * i1) - r2Y * r2X * i2;
      this.m_mass.col3.x = (-r1Y * i1) - r2Y * i2;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
      this.m_mass.col3.y = r1X * i1 + r2X * i2;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = i1 + i2;
      this.m_motorMass = 1.0 / (i1 + i2);
      if (this.m_enableMotor == false) {
         this.m_motorImpulse = 0.0;
      }
      if (this.m_enableLimit) {
         var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
         if (b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * b2Settings.b2_angularSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
         }
         else if (jointAngle <= this.m_lowerAngle) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
               this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atLowerLimit;
         }
         else if (jointAngle >= this.m_upperAngle) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
               this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atUpperLimit;
         }
         else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
         }
      }
      else {
         this.m_limitState = b2Joint.e_inactiveLimit;
      }
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_motorImpulse *= step.dtRatio;
         var PX = this.m_impulse.x;
         var PY = this.m_impulse.y;
         bA.m_linearVelocity.x -= m1 * PX;
         bA.m_linearVelocity.y -= m1 * PY;
         bA.m_angularVelocity -= i1 * ((r1X * PY - r1Y * PX) + this.m_motorImpulse + this.m_impulse.z);
         bB.m_linearVelocity.x += m2 * PX;
         bB.m_linearVelocity.y += m2 * PY;
         bB.m_angularVelocity += i2 * ((r2X * PY - r2Y * PX) + this.m_motorImpulse + this.m_impulse.z);
      }
      else {
         this.m_impulse.SetZero();
         this.m_motorImpulse = 0.0;
      }
   }
   b2RevoluteJoint.prototype.SolveVelocityConstraints = function (step) {
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var tMat;
      var tX = 0;
      var newImpulse = 0;
      var r1X = 0;
      var r1Y = 0;
      var r2X = 0;
      var r2Y = 0;
      var v1 = bA.m_linearVelocity;
      var w1 = bA.m_angularVelocity;
      var v2 = bB.m_linearVelocity;
      var w2 = bB.m_angularVelocity;
      var m1 = bA.m_invMass;
      var m2 = bB.m_invMass;
      var i1 = bA.m_invI;
      var i2 = bB.m_invI;
      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
         var Cdot = w2 - w1 - this.m_motorSpeed;
         var impulse = this.m_motorMass * ((-Cdot));
         var oldImpulse = this.m_motorImpulse;
         var maxImpulse = step.dt * this.m_maxMotorTorque;
         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
         impulse = this.m_motorImpulse - oldImpulse;
         w1 -= i1 * impulse;
         w2 += i2 * impulse;
      }
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var Cdot1X = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
         var Cdot1Y = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
         var Cdot2 = w2 - w1;
         this.m_mass.Solve33(this.impulse3, (-Cdot1X), (-Cdot1Y), (-Cdot2));
         if (this.m_limitState == b2Joint.e_equalLimits) {
            this.m_impulse.Add(this.impulse3);
         }
         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse < 0.0) {
               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
               this.impulse3.x = this.reduced.x;
               this.impulse3.y = this.reduced.y;
               this.impulse3.z = (-this.m_impulse.z);
               this.m_impulse.x += this.reduced.x;
               this.m_impulse.y += this.reduced.y;
               this.m_impulse.z = 0.0;
            }
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse > 0.0) {
               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
               this.impulse3.x = this.reduced.x;
               this.impulse3.y = this.reduced.y;
               this.impulse3.z = (-this.m_impulse.z);
               this.m_impulse.x += this.reduced.x;
               this.m_impulse.y += this.reduced.y;
               this.m_impulse.z = 0.0;
            }
         }
         v1.x -= m1 * this.impulse3.x;
         v1.y -= m1 * this.impulse3.y;
         w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
         v2.x += m2 * this.impulse3.x;
         v2.y += m2 * this.impulse3.y;
         w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z);
      }
      else {
         tMat = bA.m_xf.R;
         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var CdotX = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
         var CdotY = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
         this.m_mass.Solve22(this.impulse2, (-CdotX), (-CdotY));
         this.m_impulse.x += this.impulse2.x;
         this.m_impulse.y += this.impulse2.y;
         v1.x -= m1 * this.impulse2.x;
         v1.y -= m1 * this.impulse2.y;
         w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
         v2.x += m2 * this.impulse2.x;
         v2.y += m2 * this.impulse2.y;
         w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x);
      }
      bA.m_linearVelocity.SetV(v1);
      bA.m_angularVelocity = w1;
      bB.m_linearVelocity.SetV(v2);
      bB.m_angularVelocity = w2;
   }
   b2RevoluteJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var oldLimitImpulse = 0;
      var C = 0;
      var tMat;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var angularError = 0.0;
      var positionError = 0.0;
      var tX = 0;
      var impulseX = 0;
      var impulseY = 0;
      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
         var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
         var limitImpulse = 0.0;
         if (this.m_limitState == b2Joint.e_equalLimits) {
            C = b2Math.Clamp(angle - this.m_lowerAngle, (-b2Settings.b2_maxAngularCorrection), b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
            angularError = b2Math.Abs(C);
         }
         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            C = angle - this.m_lowerAngle;
            angularError = (-C);
            C = b2Math.Clamp(C + b2Settings.b2_angularSlop, (-b2Settings.b2_maxAngularCorrection), 0.0);
            limitImpulse = (-this.m_motorMass * C);
         }
         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            C = angle - this.m_upperAngle;
            angularError = C;
            C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0.0, b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
         }
         bA.m_sweep.a -= bA.m_invI * limitImpulse;
         bB.m_sweep.a += bB.m_invI * limitImpulse;
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      } {
         tMat = bA.m_xf.R;
         var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
         var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
         r1X = tX;
         tMat = bB.m_xf.R;
         var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
         var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
         r2X = tX;
         var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
         var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
         var CLengthSquared = CX * CX + CY * CY;
         var CLength = Math.sqrt(CLengthSquared);
         positionError = CLength;
         var invMass1 = bA.m_invMass;
         var invMass2 = bB.m_invMass;
         var invI1 = bA.m_invI;
         var invI2 = bB.m_invI;
         var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
         if (CLengthSquared > k_allowedStretch * k_allowedStretch) {
            var uX = CX / CLength;
            var uY = CY / CLength;
            var k = invMass1 + invMass2;
            var m = 1.0 / k;
            impulseX = m * ((-CX));
            impulseY = m * ((-CY));
            var k_beta = 0.5;
            bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
            bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
            bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
            bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
            CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
            CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
         }
         this.K1.col1.x = invMass1 + invMass2;
         this.K1.col2.x = 0.0;
         this.K1.col1.y = 0.0;
         this.K1.col2.y = invMass1 + invMass2;
         this.K2.col1.x = invI1 * r1Y * r1Y;
         this.K2.col2.x = (-invI1 * r1X * r1Y);
         this.K2.col1.y = (-invI1 * r1X * r1Y);
         this.K2.col2.y = invI1 * r1X * r1X;
         this.K3.col1.x = invI2 * r2Y * r2Y;
         this.K3.col2.x = (-invI2 * r2X * r2Y);
         this.K3.col1.y = (-invI2 * r2X * r2Y);
         this.K3.col2.y = invI2 * r2X * r2X;
         this.K.SetM(this.K1);
         this.K.AddM(this.K2);
         this.K.AddM(this.K3);
         this.K.Solve(b2RevoluteJoint.tImpulse, (-CX), (-CY));
         impulseX = b2RevoluteJoint.tImpulse.x;
         impulseY = b2RevoluteJoint.tImpulse.y;
         bA.m_sweep.c.x -= bA.m_invMass * impulseX;
         bA.m_sweep.c.y -= bA.m_invMass * impulseY;
         bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
         bB.m_sweep.c.x += bB.m_invMass * impulseX;
         bB.m_sweep.c.y += bB.m_invMass * impulseY;
         bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
         bA.SynchronizeTransform();
         bB.SynchronizeTransform();
      }
      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.postDefs.push(function () {
      Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b2Vec2();
   });
   Box2D.inherit(b2RevoluteJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2RevoluteJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2RevoluteJointDef.b2RevoluteJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
   };
   b2RevoluteJointDef.prototype.b2RevoluteJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_revoluteJoint;
      this.localAnchorA.Set(0.0, 0.0);
      this.localAnchorB.Set(0.0, 0.0);
      this.referenceAngle = 0.0;
      this.lowerAngle = 0.0;
      this.upperAngle = 0.0;
      this.maxMotorTorque = 0.0;
      this.motorSpeed = 0.0;
      this.enableLimit = false;
      this.enableMotor = false;
   }
   b2RevoluteJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
   Box2D.inherit(b2WeldJoint, Box2D.Dynamics.Joints.b2Joint);
   b2WeldJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
   b2WeldJoint.b2WeldJoint = function () {
      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
      this.m_localAnchorA = new b2Vec2();
      this.m_localAnchorB = new b2Vec2();
      this.m_impulse = new b2Vec3();
      this.m_mass = new b2Mat33();
   };
   b2WeldJoint.prototype.GetAnchorA = function () {
      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
   }
   b2WeldJoint.prototype.GetAnchorB = function () {
      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
   }
   b2WeldJoint.prototype.GetReactionForce = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
   }
   b2WeldJoint.prototype.GetReactionTorque = function (inv_dt) {
      if (inv_dt === undefined) inv_dt = 0;
      return inv_dt * this.m_impulse.z;
   }
   b2WeldJoint.prototype.b2WeldJoint = function (def) {
      this.__super.b2Joint.call(this, def);
      this.m_localAnchorA.SetV(def.localAnchorA);
      this.m_localAnchorB.SetV(def.localAnchorB);
      this.m_referenceAngle = def.referenceAngle;
      this.m_impulse.SetZero();
      this.m_mass = new b2Mat33();
   }
   b2WeldJoint.prototype.InitVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
      this.m_mass.col3.y = rAX * iA + rBX * iB;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = iA + iB;
      if (step.warmStarting) {
         this.m_impulse.x *= step.dtRatio;
         this.m_impulse.y *= step.dtRatio;
         this.m_impulse.z *= step.dtRatio;
         bA.m_linearVelocity.x -= mA * this.m_impulse.x;
         bA.m_linearVelocity.y -= mA * this.m_impulse.y;
         bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
         bB.m_linearVelocity.x += mB * this.m_impulse.x;
         bB.m_linearVelocity.y += mB * this.m_impulse.y;
         bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z);
      }
      else {
         this.m_impulse.SetZero();
      }
   }
   b2WeldJoint.prototype.SolveVelocityConstraints = function (step) {
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      var vA = bA.m_linearVelocity;
      var wA = bA.m_angularVelocity;
      var vB = bB.m_linearVelocity;
      var wB = bB.m_angularVelocity;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
      var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
      var Cdot2 = wB - wA;
      var impulse = new b2Vec3();
      this.m_mass.Solve33(impulse, (-Cdot1X), (-Cdot1Y), (-Cdot2));
      this.m_impulse.Add(impulse);
      vA.x -= mA * impulse.x;
      vA.y -= mA * impulse.y;
      wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
      vB.x += mB * impulse.x;
      vB.y += mB * impulse.y;
      wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
      bA.m_angularVelocity = wA;
      bB.m_angularVelocity = wB;
   }
   b2WeldJoint.prototype.SolvePositionConstraints = function (baumgarte) {
      if (baumgarte === undefined) baumgarte = 0;
      var tMat;
      var tX = 0;
      var bA = this.m_bodyA;
      var bB = this.m_bodyB;
      tMat = bA.m_xf.R;
      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
      rAX = tX;
      tMat = bB.m_xf.R;
      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
      rBX = tX;
      var mA = bA.m_invMass;
      var mB = bB.m_invMass;
      var iA = bA.m_invI;
      var iB = bB.m_invI;
      var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
      var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
      var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
      var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
      var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
      var angularError = b2Math.Abs(C2);
      if (positionError > k_allowedStretch) {
         iA *= 1.0;
         iB *= 1.0;
      }
      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
      this.m_mass.col1.y = this.m_mass.col2.x;
      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
      this.m_mass.col3.y = rAX * iA + rBX * iB;
      this.m_mass.col1.z = this.m_mass.col3.x;
      this.m_mass.col2.z = this.m_mass.col3.y;
      this.m_mass.col3.z = iA + iB;
      var impulse = new b2Vec3();
      this.m_mass.Solve33(impulse, (-C1X), (-C1Y), (-C2));
      bA.m_sweep.c.x -= mA * impulse.x;
      bA.m_sweep.c.y -= mA * impulse.y;
      bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
      bB.m_sweep.c.x += mB * impulse.x;
      bB.m_sweep.c.y += mB * impulse.y;
      bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
   }
   Box2D.inherit(b2WeldJointDef, Box2D.Dynamics.Joints.b2JointDef);
   b2WeldJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
   b2WeldJointDef.b2WeldJointDef = function () {
      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      this.localAnchorA = new b2Vec2();
      this.localAnchorB = new b2Vec2();
   };
   b2WeldJointDef.prototype.b2WeldJointDef = function () {
      this.__super.b2JointDef.call(this);
      this.type = b2Joint.e_weldJoint;
      this.referenceAngle = 0.0;
   }
   b2WeldJointDef.prototype.Initialize = function (bA, bB, anchor) {
      this.bodyA = bA;
      this.bodyB = bB;
      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
   }
})();
(function () {
   var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
   b2DebugDraw.b2DebugDraw = function () {
      this.m_drawScale = 1.0;
      this.m_lineThickness = 1.0;
      this.m_alpha = 1.0;
      this.m_fillAlpha = 1.0;
      this.m_xformScale = 1.0;
      var __this = this;
      //#WORKAROUND
      this.m_sprite = {
         graphics: {
            clear: function () {
               __this.m_ctx.clearRect(0, 0, __this.m_ctx.canvas.width, __this.m_ctx.canvas.height)
            }
         }
      };
   };
   b2DebugDraw.prototype._color = function (color, alpha) {
      return "rgba(" + ((color & 0xFF0000) >> 16) + "," + ((color & 0xFF00) >> 8) + "," + (color & 0xFF) + "," + alpha + ")";
   };
   b2DebugDraw.prototype.b2DebugDraw = function () {
      this.m_drawFlags = 0;
   };
   b2DebugDraw.prototype.SetFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags = flags;
   };
   b2DebugDraw.prototype.GetFlags = function () {
      return this.m_drawFlags;
   };
   b2DebugDraw.prototype.AppendFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags |= flags;
   };
   b2DebugDraw.prototype.ClearFlags = function (flags) {
      if (flags === undefined) flags = 0;
      this.m_drawFlags &= ~flags;
   };
   b2DebugDraw.prototype.SetSprite = function (sprite) {
      this.m_ctx = sprite;
   };
   b2DebugDraw.prototype.GetSprite = function () {
      return this.m_ctx;
   };
   b2DebugDraw.prototype.SetDrawScale = function (drawScale) {
      if (drawScale === undefined) drawScale = 0;
      this.m_drawScale = drawScale;
   };
   b2DebugDraw.prototype.GetDrawScale = function () {
      return this.m_drawScale;
   };
   b2DebugDraw.prototype.SetLineThickness = function (lineThickness) {
      if (lineThickness === undefined) lineThickness = 0;
      this.m_lineThickness = lineThickness;
      this.m_ctx.strokeWidth = lineThickness;
   };
   b2DebugDraw.prototype.GetLineThickness = function () {
      return this.m_lineThickness;
   };
   b2DebugDraw.prototype.SetAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
      this.m_alpha = alpha;
   };
   b2DebugDraw.prototype.GetAlpha = function () {
      return this.m_alpha;
   };
   b2DebugDraw.prototype.SetFillAlpha = function (alpha) {
      if (alpha === undefined) alpha = 0;
      this.m_fillAlpha = alpha;
   };
   b2DebugDraw.prototype.GetFillAlpha = function () {
      return this.m_fillAlpha;
   };
   b2DebugDraw.prototype.SetXFormScale = function (xformScale) {
      if (xformScale === undefined) xformScale = 0;
      this.m_xformScale = xformScale;
   };
   b2DebugDraw.prototype.GetXFormScale = function () {
      return this.m_xformScale;
   };
   b2DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
      if (!vertexCount) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      for (var i = 1; i < vertexCount; i++) {
         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
      }
      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
      if (!vertexCount) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;

      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.fillStyle = this._color(color.color, this.m_fillAlpha);
      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      for (var i = 1; i < vertexCount; i++) {
         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
      }
      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
      s.closePath();
      s.fill();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawCircle = function (center, radius, color) {
      if (!radius) return;
      var s = this.m_ctx;
      var drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.arc(center.x * drawScale, center.y * drawScale, radius * drawScale, 0, Math.PI * 2, true);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
      if (!radius) return;
      var s = this.m_ctx,
         drawScale = this.m_drawScale,
         cx = center.x * drawScale,
         cy = center.y * drawScale;
      s.moveTo(0, 0);
      s.beginPath();
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.fillStyle = this._color(color.color, this.m_fillAlpha);
      s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
      s.moveTo(cx, cy);
      s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
      s.closePath();
      s.fill();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawSegment = function (p1, p2, color) {
      var s = this.m_ctx,
         drawScale = this.m_drawScale;
      s.strokeStyle = this._color(color.color, this.m_alpha);
      s.beginPath();
      s.moveTo(p1.x * drawScale, p1.y * drawScale);
      s.lineTo(p2.x * drawScale, p2.y * drawScale);
      s.closePath();
      s.stroke();
   };
   b2DebugDraw.prototype.DrawTransform = function (xf) {
      var s = this.m_ctx,
         drawScale = this.m_drawScale;
      s.beginPath();
      s.strokeStyle = this._color(0xff0000, this.m_alpha);
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * drawScale);

      s.strokeStyle = this._color(0xff00, this.m_alpha);
      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * drawScale);
      s.closePath();
      s.stroke();
   };
})(); //post-definitions
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;
/*
==========================================
QuadTree
Author: http://www.edoardocasella.it
Initially based on http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374


Places a Duedo Object that has a Location vector and a dimension (.Width, .Height) inside a quadtree grid
Sueggestion: if you want to use points instead of graphic objects, remember to add a reference of your big data to that point
ex: point1.RelatedObject = myEntity;
==========================================
*/


/*
 * How to:
 * Instantiate and use a new QuadTree: 
 * 
 * var q = new Duedo.QuadTree(mygame, 0, your-world-dimension-as-rectangle );
 *
*/
Duedo.QuadTree = function(gameContext, level, /*Duedo.Rectangle*/bounds) {
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.QUADTREE;

	/*how many objects a node can hold before it splits*/
	this.MaxObjects = 4;
	/*the deepest level subnode*/
	this.MaxLevels = 7;
	/*the current node level (0 being the topmost node)*/
	this._Level = 0;
	/*the 2D space that the node occupies*/
	this._Bounds;
	/*the four subnodes*/
	this._Nodes;
	/*objects list*/
	this._ObjectsList;
	/*Parent node*/
	this._ParentNode = null;
	/*The main node*/
	this._MainNode   = null;

	//Debug
	this.Debug = {
		StrokeStyle: "black"
	};

	this.__Connected = false;
	//Init
	this._Init(level, bounds);

};


//Counterclock regions
Duedo.QuadTree.TOP_RIGHT    = 0;
Duedo.QuadTree.TOP_LEFT     = 1;
Duedo.QuadTree.BOTTOM_LEFT  = 2;
Duedo.QuadTree.BOTTOM_RIGHT = 3;


/*
 * _Init
*/
Duedo.QuadTree.prototype._Init = function(level, bounds) {
	
	this._ObjectsList = [];
	this._Bounds = bounds || new Duedo.Rectangle(new Duedo.Vector2(0, 0), 0, 0);
	this._Level = level || 0;
	this._Nodes = [];
	this._MainNode = this;
};



/*
 * Connect
 * Add this quadtree to the main engine loop
*/
Duedo.QuadTree.prototype.Connect = function () {

	if (this.__Connected)
		return this;

	this.Game.Add(this);
	this.__Connected = true;
	return this;
};



/*
 * Clear
*/
Duedo.QuadTree.prototype.Clear = function() {
	
    this._ObjectsList = [];
	 
    for( var i=0; i < this._Nodes.length; i++ ) {
        if( typeof this._Nodes[i] !== 'undefined' ) {
            this._Nodes[i].Clear();
            delete this._Nodes[i];
        }
    }
};




/*
 * _Split
 * Split the node into 4 subnodes
*/
Duedo.QuadTree.prototype._Split = function() {
	
	var subWidth  = this._Bounds.Width / 2;
	var subHeight = this._Bounds.Height / 2;

	var x = this._Bounds.Location.X;
	var y = this._Bounds.Location.Y;

	this._Nodes[0] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x + subWidth, y), subWidth, subHeight));
	this._Nodes[1] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x, y), subWidth, subHeight));
	this._Nodes[2] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x, y + subHeight), subWidth, subHeight));
	this._Nodes[3] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x + subWidth, y + subHeight), subWidth, subHeight));

	//Link parent node
	for (var i in this._Nodes) {
		this._Nodes[i]._ParentNode = this;
		this._Nodes[i]._MainNode = this._MainNode;
	}
	return this;
};



/*
 * GetIndex
 * Determine which node the object belongs to. -1 means
 * object cannot completely fit within a child node and is part
 * of the parent node
 */
Duedo.QuadTree.prototype.GetIndex = function(rect) {

	var index = -1;

	var midX = this._Bounds.Center.X;
	var midY = this._Bounds.Center.Y;

	//Rect is on top or bottom quadrants?
	var onTop     = rect.Location.Y < midY && rect.Location.Y + rect.Height < midY;
	var onBottom  = rect.Location.Y > midY;  
	
	if(rect.Location.X < midX && rect.Location.X + rect.Width < midX) {
		if(onTop)
			index = Duedo.QuadTree.TOP_LEFT;
		else if(onBottom) index = Duedo.QuadTree.BOTTOM_LEFT; 
	}
	else if(rect.Location.X > midX)
		if(onTop)
			index = Duedo.QuadTree.TOP_RIGHT;
		else if(onBottom)
			index = Duedo.QuadTree.BOTTOM_RIGHT;


	return index;

};


/*
 * Insert
 * Insert the object into the quadtree. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding nodes.
 */
Duedo.QuadTree.prototype.Insert = function(rect) {

	if(this.Null(rect))
		return this;

	if(this._HasChildNodes())
	{
		var index = this.GetIndex(rect);
		
		if (index !== -1) {
			this._Nodes[index].Insert(rect);
			/*the object retains a reference to its container*/
			rect.__QNode = this._Nodes[index];
			return;
		}
	}


	//Insert into the main list
	this._ObjectsList.push(rect);
	rect.__QNode = this;

	//... then check if we are in need of splitting the node
	if(this._ObjectsList.length > this.MaxObjects && this._Level < this.MaxLevels)
	{
		if(!this._HasChildNodes())
			this._Split();

		var i = 0;
		while(i < this._ObjectsList.length)
		{
			var index = this.GetIndex(this._ObjectsList[i]);

			if(index !== -1)
				this._Nodes[index].Insert(this._ObjectsList.splice(i, 1)[0]);
			else
				i++;
		}
	}


	return this;

};



/*
 * Add
 * @public
 * Same as Insert
*/
Duedo.QuadTree.prototype.Add = Duedo.QuadTree.prototype.Insert;



/*
 * Null
 * Is this object null?
*/
Duedo.QuadTree.prototype.Null = function(obj) {
	return (obj === null || typeof obj === "undefined");	
};


/*
 * _HasChildNodes
 * Return true if this node contains child nodes
*/
Duedo.QuadTree.prototype._HasChildNodes = function() {
	return !this.Null(this._Nodes[0]);
};


/*
 * Retrieve
 * Return nearest objects to rect
*/
Duedo.QuadTree.prototype.Retrieve = function(rect) {

	var index = this.GetIndex(rect);
	var list = this._ObjectsList;

	if(this._HasChildNodes())
	{
		if(index !== -1)
		{
			list = list.concat(this._Nodes[index].Retrieve(rect));
		}
	}


	return list;

};



/*
 * Connected
 * Return true if this quadtree is inside the game loop (so affected by update logics)
*/
Object.defineProperty(Duedo.QuadTree.prototype, "Connected", {

	get: function () { return this.__Connected; }

});


/*IsEmpty*/
Object.defineProperty(Duedo.QuadTree.prototype, "IsEmpty", {
	
	get: function () {
		return (this._ObjectsList.length == 0);
	}

});


/*
 * Update
 * Update the quadtree for moving objects
*/
Duedo.QuadTree.prototype.Update = function () {

    //TODO:
    //Remove from current node
    //add in the next/or actual node that fits
    //Only when the last position is different from the new?

    for (var x = this._ObjectsList.length - 1; x >= 0; x--) {
        var ob = this.Remove(this._ObjectsList[x]);
        if (ob != null) {
            //Instead of inserting from the "main node" should i move up gradually from this object?
            this._MainNode.Insert(ob);
        }
    }

    /*Update subnodes*/
    for (var i = this._Nodes.length - 1; i >= 0; i--) 
        this._Nodes[i].Update();
};


/*
 * Remove
 * Remove an object from this node
*/
Duedo.QuadTree.prototype.Remove = function (obj) {

    var ind = this._ObjectsList.indexOf(obj);
    if (ind != -1)
        return this._ObjectsList.splice(ind, 1)[0];

    return null;
    
};




/*
 ==========================
 DRAWING METHODS
 ==========================
*/
/*
 * Draw
 * Draw this node
*/

Duedo.QuadTree.__dr_index = 0;

Duedo.QuadTree.prototype.Draws = function(ctx) {

    this.DrawObjects(ctx);
	ctx.strokeStyle = "black";
	ctx.rect(this._Bounds.Location.X, this._Bounds.Location.Y, this._Bounds.Width, this._Bounds.Height);
	ctx.stroke();
	
    /*Draw children nodes*/
	if (this._HasChildNodes())
		for (var i in this._Nodes)
		    this._Nodes[i].Draws(ctx);
};


/*
 * DrawNode
*/
Duedo.QuadTree.prototype.DrawObjects = function(ctx) {

	ctx.strokeStyle = "black";

	for(var i = 0; i < this._ObjectsList.length; i++ )
		ctx.strokeRect(this._ObjectsList[i].Location.X, this._ObjectsList[i].Location.Y, 5, 5);
    
	/*Total per node*/
	ctx.strokeText(this._ObjectsList.length, this._Bounds.Location.X + 10, this._Bounds.Location.Y + 10);
};


/*
 * Draw
 * @static public
 * Draw a quadtree
*/
Duedo.QuadTree.Draw = function(qt, ctx) {
	qt.Draws(ctx);
};
/*
==============================
Duedo.PhysicsEngine
Author: http://www.edoardocasella.it

This Physics manager uses:
/**
* Box2d 
* Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com


*
* Triggerable events:
* beforeUpdate
* afterUpdate
* To add an event use: AddEvent("afterUpdate", callbackFunction);
* 
==============================
*/


/*
 * PhysicsEngine
*/
Duedo.PhysicsEngine = function(gameContext, options) {
	this.PhysicsEngine = "box2d";
	this.Game = gameContext || Duedo.Global.Games[0];

    this.FixDef = null;

    this.Conf = {
        AllowSleep:false,
        Gravity: new Duedo.Vector2(0, 35),
        VelocityCorrection: 100,
        PositionCorrection: 3
    };

    this._FixDefDefault = {
        density: 1.0,    // kg/m^2
        friction: 0.5,
        restitution:0.2, // [0.. 1]
        isSensor:false,
        isStatic: false
    };

    this.World = null;

    this.Enabled = true;

    /*
     * @private
    */
    this._Debug = false;

	this._init(options);
};


/*
 * _init
*/
Duedo.PhysicsEngine.prototype._init = function(options) {
    
    if(!this.Enabled)
        return;

	this.World = new b2World(
        new b2Vec2(this.Conf.Gravity.X, this.Conf.Gravity.Y), //gravity
        this.Conf.AllowSleep
    );

};	


/*
* RectBody
*/
Duedo.PhysicsEngine.prototype.RectBody = function(position, width, height, options) {

    options = Duedo.Extend(options, this._FixDefDefault);

    var fixDef
    , bodyDef
    , body;

    /*Fixture*/
    fixDef             = new b2FixtureDef;
    fixDef.density     = options.density;
    fixDef.friction    = options.friction;
    fixDef.restitution = options.restitution;
    fixDef.isSensor    = options.isSensor;
    fixDef.fixedRotation    = options.fixedRotation != null ? options.fixedRotation : false;

    /*Body def*/
    bodyDef = new b2BodyDef; 

    bodyDef.type = options.isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;

    /*position: in meters*/
    bodyDef.position.x = position.X;
    bodyDef.position.y = position.Y;
       
    fixDef.shape = new b2PolygonShape;

    // Notice that the parameters of SetAsBox are the 'half-width' and 'half-height' of the box
    // and it is centered at the location of the body it gets attached to
    fixDef.shape.SetAsBox(width / 2, height / 2);

    body = this.World.CreateBody(bodyDef).CreateFixture(fixDef);

    return body.GetBody();

};  


/*
 * CircleBody
*/
Duedo.PhysicsEngine.prototype.CircleBody = function(position, radius, options) {

    options = Duedo.Extend(options, this._FixDefDefault);

    var fixDef
    , bodyDef
    , body;

    /*Fixture*/
    fixDef             = new b2FixtureDef;
    fixDef.density     = options.density;
    fixDef.friction    = options.friction;
    fixDef.restitution = options.restitution;
    fixDef.isSensor    = options.isSensor;

    /*Body def*/
    bodyDef = new b2BodyDef; 

    bodyDef.type = options.isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;

    /*position: in meters*/
    bodyDef.position.x = position.X;
    bodyDef.position.y = position.Y;
       
    fixDef.shape = new b2CircleShape(radius || 1/*meters*/);
       
    body = this.World.CreateBody(bodyDef).CreateFixture(fixDef);

    return body.GetBody();
};


/*
 * PreUpdate
*/
Duedo.PhysicsEngine.prototype.PreUpdate = function(deltaT, correction) {

};



/*
 * Update
 * Main update
*/
Duedo.PhysicsEngine.prototype.Update = function(deltaT) {

    if(!this.Enabled)
        return;

   this._StepPhysics(deltaT, 1);
};



/*
 * _StepPhysics
 * @private
 * Physics final update
*/
Duedo.PhysicsEngine.prototype._StepPhysics = function(dt, correction) {
    this.World.Step(dt, this.Conf.VelocityCorrection, this.Conf.PositionCorrection);
};


/*
 * PostUpdate
*/
Duedo.PhysicsEngine.prototype.PostUpdate = function() {

    if(!this.Enabled)
        return;

    this.World.ClearForces();
};

/*
 * RenderDebugInfo
*/
Duedo.PhysicsEngine.prototype.RenderDebugInfo = function() {

    this.World.DrawDebugData(false);
};


/*
 * Debug
 * activate or deactivate debug rendering
*/
Object.defineProperty(Duedo.PhysicsEngine.prototype, "Debug", {

    set: function(val) {

        if(val === true) {
            //setup debug draw
            this.Game.Debug = true;
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(this.Game.Renderer.Context);
            debugDraw.SetDrawScale(Duedo.Conf.PixelsInMeter);
            debugDraw.SetFillAlpha(0.5);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            this.World.SetDebugDraw(debugDraw);
            this._Debug = true;
        }
    },

    get: function() {
        return this._Debug;
    }

});




var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

/*
==============================
Duedo.ChildrenList
Author: http://www.edoardocasella.it

Represents the collection of child objects or related in some way to another.
==============================
*/

Duedo.ChildrenList = function () {
 
  this._Id = 0;
  this._Items = []; 

};


Duedo.ChildrenList.prototype.constructor = Duedo.ChildrenList;



/*
 * Add
 * Add an object to the list
*/
Duedo.ChildrenList.prototype.Add = function (object, name = null) {
  if(!name) {
    name = `item_${++this._Id}`;
  }
  this._Items.push({object, name, id: this._Id});
  return this;
};


/*
 * Empty
 * Remove all objects
*/
Duedo.ChildrenList.prototype.Empty = function () {
  this._Items.forEach(item => {
    if(item.Destroy) {
      item.Destroy();
    }
  })
  this._Items = [];
  return this;
};



/*
 * HasChildren
 * Check if the list contains something
*/
Duedo.ChildrenList.prototype.HasChildren = function () {
  return this._Items.length > 0;
};



/*
 * Get
 * Get an object by index or name
*/
Duedo.ChildrenList.prototype.Get = function (index = null) {
  if(isNaN(index)) {
    return this._Items.find(item => item.name === index);
  } else {
    return this._Items[index];
  }
};


/*
 * RemoveObject
 * Remove an object by reference or index: integer
*/
Duedo.ChildrenList.prototype.RemoveObject = function (object) {
  let index = null;
  if(isNaN(object)) { 
    index = this._Items.indexOf(object);
  } else {
    index = object
  }
  if (index != -1)
    return this._Items.splice(i, 1)[0];

  return null;
};



/*
* List
* Return a list of only entities
*/
Object.defineProperty(Duedo.ChildrenList.prototype, "List", {

  get: function () {
      return this._Items.map(child => child.object);
  }

});


/*
* Length
* Return the length of the list
*/
Object.defineProperty(Duedo.ChildrenList.prototype, "Length", {

  get: function () {
      return this._Items.length;
  }

});



/*
==============================
Duedo.Animation
Author: http://www.edoardocasella.it

 Animation bindable triggers
- complete
- progress
- start

==============================
*/



Duedo.Animation = function ( game, targetObject ) {
    Duedo.Object.call(this);
    this.Game = game || Duedo.Global.Games[0];

    this.AffectedObject = targetObject || null;
    this.Name;
    /*Time*/
    this.StartTime;
    this.Duration;
    this.ElapsedTime;
    this.TimeInterval;
    this.ActualTime;

    /*Tweening*/
    this.Tweening;
    this._Yoyo;
    this.YoyoRepeat = Infinity;
    this._YoyoRepeated = 0;

    /*Value progress*/
    this.LastValue;

    this._Data;
    this.Length = 0;
    /*Keep trace of the current animation status*/
    this._AnimStatus;
    this._Paused;
    this._PendingStop;
    this._CompleteOnStop;

    this._init();
};


/*Inherit generic object*/
Duedo.Animation.prototype = Object.create(Duedo.Object.prototype);
Duedo.Animation.prototype.constructor = Duedo.Animation;


/*
 * _init
*/
Duedo.Animation.prototype._init = function() {
    
    this.StartTime     = 0;
    this.Duration      = 0;
    this.ElapsedTime   = 0;
    this.TimeInterval  = 0;
    this.ActualTime    = 0;
    this.Tweening      = "Linear";
    this._PendingStop  = false;
    this._AnimStatus   = null;
    this._Paused       = false;
    this._Yoyo         = false;
    this._YoyoRepeated = 0;
    
    this._Data         = {};

    return this;
};


/*
Animation macros
*/
Duedo.Animation._ENDED_    = -1;
Duedo.Animation._PAUSED_   = 0;
Duedo.Animation._PROGRESS_ = 1;


/*
 * Main update
 * @public
*/
Duedo.Animation.prototype.Update = function (deltaT) {

    /*Paused*/
    if(this._Paused)
    {
        return this._AnimStatus = Duedo.Animation._PAUSED_;
    }

    /*Pending stop*/
    if(this._PendingStop)
    {
        if(this._CompleteOnStop)
        {
            this._CompleteAnimation();
        }
        else
        {
            return Duedo.Animation._ENDED_;
        }
    }

    /*Step animation*/
    if (Duedo.Utils.IsNull(deltaT) || deltaT <= 0)
    {
        return;
    }
    else
    {        
        return this._AnimStatus = this._Step(deltaT);
    }


};



/*
 * YoyoRepeat
 * @public
 * repeat the animation
*/
Duedo.Animation.prototype.Yoyo = function(times) {
    this._Yoyo = true;
    this.YoyoRepeat = times || Infinity;
};



/*
 * _Step
 * private
 * Advance animation
*/
Duedo.Animation.prototype._Step = function(deltaT) {

    var Progress;

    this.ActualTime += deltaT;
    
    /*Get ElapsedTime*/
    if(this.ElapsedTime < this.Duration) 
    {
        this.ElapsedTime = this.ActualTime - this.StartTime;
    }
    
    Progress = this.ElapsedTime / this.Duration;

    if(Progress > 1)
    {
        Progress = 1;
    }


    /*Duedo native easing function*/
    if(typeof this.Tweening === "string")
    {
        if(!Duedo.Utils.IsNull(Duedo.Easing[this.Tweening]))
        {
             Progress = Duedo.Easing[this.Tweening](Progress);
        }
        else
        {
            throw "Duedo.Animation._step: unrecognized easing algorithm " + this.Tweening;
        }
           
    }   
    /*Personalized easing function*/
    else if(typeof this.Tweening === "function")
    {
        Progress = this.Tweening(Progress);
    }
    

    var propCompleted = 0;

    /*Cycle through properties*/
    for(var prop in this._Data)
    {   
        if(Duedo.Utils.IsNull(this._Data[prop]["StartValue"]))
        {   
            for(var o in this._Data[prop])
            {
                this.AffectedObject[prop][o] = this._Data[prop][o].StartValue - (Progress * (this._Data[prop][o].StartValue - this._Data[prop][o].EndValue));
                if(this.AffectedObject[prop][o] === this._Data[prop][o].EndValue)
                    ++propCompleted;
            }
        }
        else
        {   
            this.AffectedObject[prop] = this._Data[prop].StartValue - (Progress * (this._Data[prop].StartValue - this._Data[prop].EndValue));
            if(this.AffectedObject[prop] === this._Data[prop].EndValue)
                ++propCompleted;
        }
    }


    if(this.ElapsedTime >= this.Duration || propCompleted === this.Length)
    {
        if(this._Yoyo)
        {
            
            if(this._YoyoRepeated >= this.YoyoRepeat)
                return Duedo.Animation._ENDED_;

            this._InvertAnimation();
            
            this._YoyoRepeated++;

            return Duedo.Animation._PROGRESS_;
        }
        else
        {
            return Duedo.Animation._ENDED_;
        }

    }
    else
    {
        return Duedo.Animation._PROGRESS_;
    }

};




/*
 * _InvertAnimation
 * Private
*/
Duedo.Animation.prototype._InvertAnimation = function() {

    for(var prop in this._Data)
    {
        if(Duedo.Utils.IsNull(this._Data[prop]["StartValue"]))
        {   
            for(var o in this._Data[prop])
            {
                var end = this._Data[prop][o].StartValue;
                this._Data[prop][o].StartValue = this._Data[prop][o].EndValue;
                this._Data[prop][o].EndValue = end;
            }
        }
        else
        {   
            var end = this._Data[prop].StartValue;
            this._Data[prop].StartValue = this._Data[prop].EndValue;
            this._Data[prop].EndValue = end;
        }
    }

    this.ElapsedTime = 0;
    this.ActualTime = this.Game.ElapsedTime;
    this.StartTime  = this.Game.ElapsedTime;

};



/*
 * _CompleteAnimation
 * Private
*/
Duedo.Animation.prototype._CompleteAnimation = function() {
    this.ElapsedTime = this.Duration;
};




/*
 * Stop
 * @public
*/
Duedo.Animation.prototype.Stop = function ( complete ) {
    this._PendingStop = true;
    this._CompleteOnStop = complete || false;
};




/*
 * Pause and resume controls
 * @public
*/
Object.defineProperty(Duedo.Animation.prototype, "Pause", {

    get: function() {
        return this._Paused;
    },

    set: function (value) {
        this._Paused = value;
    }


});





/*
==============================
Duedo.AnimationManager
Author: http://www.edoardocasella.it

Notes:
--
 * Bindable triggers
 * start
 * complete
 * progress
--

==============================
*/


Duedo.AnimationManager = function (gameContext, parent) {
    Duedo.Object.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.ANIMATIONMANAGER;
    /*Owner object*/
    this.Parent = parent || null;

    this.Animations = [];
};


/*Inherit generic object*/
Duedo.AnimationManager.prototype = Object.create(Duedo.Object.prototype);
Duedo.AnimationManager.prototype.constructor = Duedo.AnimationManager;



/*
 * Animate
 * @public
 * @AffectProperties: Property name (es: Location: {X:10, Y:20} or Radius: 50)
 * @Duration: animation duration 1 = 1 second || 0.005.... || 0.000006....
 * @Tweening: animation type: EaseIn, EaseOut....
*/
Duedo.AnimationManager.prototype.Animate = function ( AffectedProperties, Duration, Tweening, name ) {
    
    if(Duedo.Utils.IsNull(AffectedProperties))
    {
        return null;
    }

    var Animation;
    var pValue;
    var self = this; 
    var ID = this.Animations.length;

    Duration  = Duration != null ? Duration : 1 /*second*/;
    Animation = new Duedo.Animation(this.Game, this.Parent);
    
    for (var PropertyName in AffectedProperties) {
        
        Animation.StartTime           = this.Game.ElapsedTime;
        Animation.ActualTime          = this.Game.ElapsedTime;
        Animation.Name                = name || "animation" + this.Animations.length;
        Animation.Duration            = Duration;
        Animation.Tweening            = Tweening || "Linear";
        Animation._Data[PropertyName] = {};
        Animation.Length++;
        Animation.ID                  = ID;
        

        pValue = AffectedProperties[PropertyName];
            
        /*Destination values as object es: Location {X:10, Y:10}*/
        if(pValue instanceof Object)
        {
            for(var valN in pValue )
            {
                
                Animation._Data[PropertyName][valN] = 
                { 
                    StartValue: self.Parent[PropertyName][valN],
                    EndValue: AffectedProperties[PropertyName][valN]
                }; 
            }
            
        }
        /*Destination value as single number es: Radius: 50*/
        else
        {

            Animation._Data[PropertyName] =
            { 
                StartValue: self.Parent[PropertyName],
                EndValue: AffectedProperties[PropertyName]
            }; 
        }

        
        /*Push animation in stack*/
        this.Animations.push(Animation);
    }


    return Animation;


};




/*
 * Update
 * @deltaT: main loop
 */
Duedo.AnimationManager.prototype.Update = function (deltaT) {

    var /*int*/ aStatus;

    for (var i = this.Animations.length -1; i >=0; i--)
    {
        /*Animation has started*/
        if (this.Animations[i]._AnimStatus === null)
        {
            this.Animations[i]._CallTriggers("start", this.Parent);
        }

        switch (this.Animations[i].Update(deltaT)) 
        {
            case Duedo.Animation._ENDED_:
                /*Remove animation*/
                /*FIX: the triggers are repeat for every affected properties of the same instance*/
                this.Animations[i]._CallTriggers("complete", this.Parent);
                this.Animations.splice(i, 1); 
                continue;
                break;
            case Duedo.Animation._PROGRESS_:
                /*Animation in progress*/
                this.Animations[i]._CallTriggers("progress", this.Parent);
                break;
            case Duedo.Animation._PAUSED_:
                /*Animation paused*/
                this.Animations[i]._CallTriggers("paused", this.Parent);
                break;
            default:
                continue;
                break;
        } 

    }


    return this;

};





/*
 * StopAll
 * bool@complete: stop and complete the animation
 */
Duedo.AnimationManager.prototype.StopAll = function (complete) {

    for ( var i in this.Animations )
    {
        this.Animations[i].Stop( complete );
    }

};




/*
 * PauseAll
 */
Duedo.AnimationManager.prototype.PauseAll = function () {

    for( var i in this.Animations )
    {
        this.Animations[i].Pause = true;
    }
};




/*
 * ResumeAll
 */
Duedo.AnimationManager.prototype.ResumeAll = function() {

    for( var i in this.Animations )
    {
        this.Animations[i].Pause = false;
    }

};




/*
 * GetAnimation
*/
Duedo.AnimationManager.prototype.GetAnimation = function(sname) {

    if(Duedo.Utils.IsNull(sname))
    {
        return null;
    }


    for(var i in this.Animations)
    {
        if(this.Animations[i].Name === sname)
        {
            return this.Animations[i];
        }
    }


    return null;
        
};
/*
==========================================
Shape
Author: http://www.edoardocasella.it
Based on Core HTML5 Canvas by David Geary
==========================================
*/

Duedo.Shape = function () {
    Duedo.GraphicObject.call(this);
    this.Game = Duedo.Global.Games[0];
    this.StrokeStyle = 'rgba(255, 253, 208, 0.9)';
    this._FillStyle = 'rgba(162, 204, 0, 1)';
    this.BlendMode   = Duedo.BlendModes.NORMAL;
    this.Rotation = 0;
    /*
    this.shadowOffsetX = 10;
    this.shadowOffsetY = 0;
    this.shadowColor = 'black';
    this.shadowBlur = 6;
    */
    this.Points = []; //outerclockwise
    this._init();
};


// ! MANY METHODS ARE NOT ALIGNED WITH THE PIXELS TO METERS CONVERSION


/*Inherit generic object*/
Duedo.Shape.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Shape.prototype.constructor = Duedo.Shape;



/*
 * _init
*/
Duedo.Shape.prototype._init = function() {
    this._super();
};



/*
 * MinimumTranslationVector
 * public
 * Get minimum translation vector (used for SAT collision detection)
*/
Duedo.Shape.prototype.MinimumTranslationVector = function (axes, shape) {

    var minimumOverlap = 100000;
    var overlap;
    var axisWithSmallestOverlap;

    for (var i = 0; i < axes.length; ++i) {

        axis = axes[i];

        projection1 = shape.Project(axis);
        projection2 = this.Project(axis);

        overlap = projection1.Overlaps(projection2);

        if (overlap === 0)
        {
            return {    //no collision
                axis: undefined,
                overlap: 0
            }
        }
        else
        {
            if (overlap < minimumOverlap)
            {
                minimumOverlap = overlap;
                axisWithSmallestOverlap = axis;
            }
        }
    }

    return { //mtv
        axis: axisWithSmallestOverlap,
        overlap: minimumOverlap
    };

};


/*
 * CollidesWith
 * public
 * Check collision between two shapes
*/
Duedo.Shape.prototype.CollidesWith = function (shape) {
    var axes = this.GetAxes().concat(shape.GetAxes());
    return !this.SeparationOnAxes(axes, shape);
};



/*
 * SeparationOnAxes
 * public
*/
Duedo.Shape.prototype.SeparationOnAxes = function (axes, shape) {

    if (!axes || !shape)
        return false;

    for (var i = 0; i < axes.length; ++i)
    {
        axis = axes[i];

        projection1 = shape.Project(axis);
        projection2 = this.Project(axis);

        if (!projection1.Overlaps(projection2))
        {
            return true;
        }
            
    }

    return false;
};



/*
 * Translate
*/
Duedo.Shape.prototype.Translate = function(x, y) {

    if(x instanceof Duedo.Vector2)
    {
        y = x.Y;
        x = x.X;
    }

    this.Location.X += x;
    this.Location.Y += y;

    return this;
};



Duedo.Shape.prototype.Rotate = function (rad) {
    throw 'rotate() not implemented';
};


Duedo.Shape.prototype.GetAxes = function () {
    throw 'getAxes() not implemented';
};

Duedo.Shape.prototype.Project = function (axis) {
    throw 'project() not implemented';
};

Duedo.Shape.prototype.Move = function (dx, dy) {
    throw 'move() not implemented';
};

Duedo.Shape.prototype.Translate = function (tx, ty) {
    throw 'translate() not implemented';
};

Duedo.Shape.prototype.GetPosition = function () {
    throw 'getPosition() not implemented';
};

Duedo.Shape.prototype.CreatePath = function (context) {
    throw 'createPath(context) not implemented';
};


/*
 * PreUpdate
*/
Duedo.Shape.prototype.PreUpdate = function (deltaT) {



};


/*
 * Update
*/
Duedo.Shape.prototype.Update = function (deltaT) {
    this.SuperUpdate(deltaT);
    this.UpdateAnimations(deltaT);
};


/*
 * PostUpdate
*/
Duedo.Shape.prototype.PostUpdate = function(deltaT) {

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    

    //Update vertices of complex polygons
    //Cache
    if (this.Points.length && !Duedo.Vector2.Compare(this.LastLocation, this.Location))
        this.UpdateVertices();

    this.LastLocation = this.Location.Clone();

    /*FIX: And what if the children needs the LastLocation? (in the game loop are updated after this)*/
};



/*
Fill
===================
*/
Duedo.Shape.prototype.Fill = function (context) {
    // context.save();
    /*
    context.shadowBlur = 2;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "red";
    */
    context.globalCompositeOperation = this.BlendMode;
    context.globalAlpha = this.Alpha;
    context.fillStyle = this.FillStyle;
    this.CreatePath(context);
    context.fill();
    // context.restore();
};


/*
Stroke
===================
*/
Duedo.Shape.prototype.Stroke = function (context) {
    context.globalCompositeOperation = this.BlendMode;
    context.globalAlpha = this.Alpha;
    context.strokeStyle = this.StrokeStyle;
    this.CreatePath(context);
    context.stroke();
};


/*
Is point in path
===================
*/
Duedo.Shape.prototype.IsPointInPath = function (context, x, y) {
    this.CreatePath(context);
    return context.isPointInPath(x, y);
};


/*Draw*/
Duedo.Shape.prototype.Draw = function ( context ) {

    if( !this.Renderable || this.Alpha < 0)
    {
        return false;
    }
    context.save();

    if( this.Rotation !== 0 ) {
        const origin = new Duedo.Vector2(
            this.Location.X + (this.Width * this.Anchor.X), 
            this.Location.Y + (this.Height * this.Anchor.Y)
        );
        context.translate(origin.X, origin.Y);
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(origin.X), -(origin.Y));
    }

    this.Fill(context);
    this.Stroke(context);

    context.restore();
    
    return this;

};


/*
 * UpdateVertices
 * Update point by point
*/
Duedo.Shape.prototype.UpdateVertices = function () {
    
    var translate = new Duedo.Vector2(0, 0);

    translate.X = this.Location.X - this.Points[0].X;
    translate.Y = this.Location.Y - this.Points[0].Y;

    for (var i in this.Points)
        this.Points[i].Add(translate);

};



Duedo.Shape.prototype.Rotate = function (rad) {
};


Duedo.Shape.prototype.RotateContext = function (context) {
    //throw 'RotateContext(context) not implemented';
};



/*
 * FillStyle
 * Can be an image (pattern) or a color
*/
Object.defineProperty(Duedo.Shape.prototype, "FillStyle", {

    get: function () {
        return this._FillStyle;
    },

    set: function (v) {

        /*Pattern*/
        if (v instanceof Image)
            this.FillStyle = this.Game.Renderer.Context.createPattern(v, 'repeat');
        /*RGB|RGBA|HEX*/
        else
            this._FillStyle = v;
    }

})
/*
==============================
Duedo.Dimension
==============================
*/

Duedo.Dimension = function (width, height) {
    this.Type = Duedo.DIMENSION;

    this.Width = width || undefined;
    this.Height = height || undefined;

};


/*
Duedo.Dimension.clone
==============================
*/
Duedo.Dimension.prototype.Clone = function () {
    return new Duedo.Dimension(this.Width, this.Height);
};

Duedo.Dimension.prototype.ToArray = function () {
    
    var array = new Array();

    array[0] = this.Width;
    array[1] = this.Height;

    return array;
};

Duedo.Dimension.prototype.Set = function (width, height) {
    this.Width = width || undefined;
    this.Height = height || undefined;
    return this;
};

Duedo.Dimension.prototype.Area = function () {
    return this.Width * this.Height;
};

Duedo.Dimension.prototype.MultiplyScalar = function ( scalar ) {
    this.Width *= scalar;
    this.Height *= scalar;
    return this;
};

Duedo.Dimension.prototype.DivideScalar = function (scalar) {
    this.Width /= scalar;
    this.Height /= scalar;
    return this;
};

Duedo.Dimension.prototype.MultiplyVector = function(DUEDOVec2) {
    this.Width *= DUEDOVec2.X;
    this.Height *= DUEDOVec2.Y;
    return this;
};
/*
==========================================
Point
==========================================
*/

Duedo.Point = function (x, y) {
    this.Type = Duedo.POINT;
    
    this.X = x || 0;
    this.Y = y || 0;

};



Duedo.Point.prototype.Clone = function () {
    return new Duedo.Point( this.X, this.Y );
};

Duedo.Point.prototype.ToGenericObject = function() {
    return {
        x: this.X,
        y: this.Y
    }
};


Duedo.Point.prototype.AsVector = function () {
    return new Duedo.Vector2(this.X, this.Y);
};

Duedo.Point.prototype.Set = function(x, y) {
    this.X = x;
    this.Y = y;
    return this;
};

Duedo.Point.prototype.SetBoth = function(scalar) {
    this.X = scalar;
    this.Y = scalar;
    return this;
};

Duedo.Point.prototype.Add = function (p) {
    this.X += p.X;
    this.Y += p.Y;
    return this;
};


Duedo.Point.prototype.DistanceTo = function (vec2) {
    var dx = this.X - vec2.X, dy = this.Y - vec2.Y;
    return dx * dx + dy * dy;
};

Duedo.Point.prototype.Rotate = function (rad, center) {

    var dx, dy;
    dx = this.X - center.X;
    dy = this.Y - center.Y;
    this.X = center.X + (dx * Math.cos(rad) - dy * Math.sin(rad));
    this.Y = center.Y + (dx * Math.sin(rad) + dy * Math.cos(rad));
    return this;
};

Object.defineProperty(Duedo.Point.prototype, "Width", {
    get: function () { return 1; }
});

Object.defineProperty(Duedo.Point.prototype, "Height", {
    get: function () { return 1; }
});

/*
==========================================
Duedo.Rectangle
==========================================
*/

Duedo.Rectangle = function (locationVec, width, height) {
    Duedo.Shape.call(this);
    this.Type = Duedo.RECTANGLE;

    this.Location = locationVec || new Duedo.Vector2(0, 0);
    this.Width = width || 0;
    this.Height = height || 0;
};


/*Inherit shape object*/
Duedo.Rectangle.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Rectangle.prototype.constructor = Duedo.Rectangle;


/*
 * Static methods
 */
Duedo.Rectangle.Intersects = function (ra, rb, tolerance) {

    if (ra.Width <= 0 || ra.Height <= 0 || rb.Width <= 0 || rb.Height <= 0)
    {
        return false;
    }


    return !(ra.Right < rb.Location.X || ra.Bottom < rb.Location.Y || ra.Location.X > rb.Right || ra.Location.Y > rb.Bottom);

};



Duedo.Rectangle.Equals = function (a, b) {
    return (a.Location.X === b.Location.X && a.Y === b.Location.Y && a.Width === b.Width && a.Height === b.Height);
};



/*
 * Public and private methods
 */
Duedo.Rectangle.prototype.Clone = function () {
    return new Duedo.Rectangle(this.Location.X, this.Location.Y, this.Width, this.Height);
};



Duedo.Rectangle.prototype.GetAsVector = function () {
    return new Duedo.Vector2(this.Location.X, this.Location.Y);
};



Duedo.Rectangle.prototype.Intersects = function ( rectangle, tolerance ) {

    return Duedo.Rectangle.Intersects( this, rectangle, tolerance );

};



Duedo.Rectangle.prototype.Contains = function ( x, y ) {
    
    if (this.Width <= 0 || this.Height <= 0)
    {
        return false;
    }

    if( x instanceof Duedo.Point || x instanceof Duedo.Vector2 )
    {
        y = x.Y;
        x = x.X;
    }
    
    if(!this.FixedToViewport) {
        objLoc = this.Location.Clone()
            .Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y))
            // make it relative to the canvas
            .Subtract(this.Game.Viewport.View.GetAsVector());
    } else {
        objLoc = this.ViewportOffset.Clone()
			.Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y));
    }

    if(
		x >= objLoc.X
		&& x <= objLoc.X + this.Width
		&& y >= objLoc.Y
		&& y <= objLoc.Y + this.Height
    )
    {
        return true;
    }

    return false;

};



Object.defineProperty(Duedo.Rectangle.prototype, "Center", {
    // TODO : check
    get: function () {

        if (!Duedo.Utils.IsNull(this.Angle) && this.Angle != 0)
        {
            var cosa = Math.cos(this.Angle);
            var sina = Math.sin(this.Angle);
            var wp = this.Width / 2;
            var hp = this.Height / 2;
            
            return new Duedo.Point((this.Location.X + wp * cosa - hp * sina), (this.Location.Y + wp * sina + hp * cosa));

        }
        else
        {
            
            return new Duedo.Point(this.Location.X + this.HalfWidth, this.Location.Y + this.HalfHeight);
        }


    }

});


/*
Return interesection area as output (Duedo.Rectangle)
*/
Duedo.Rectangle.IntersectsInfo = function (a, b, output) {

    if (typeof output === "undefined")
    {
        output = new Duedo.Rectangle();
    }

    // Todo, if rotated... FIXA
    // https://gamedev.stackexchange.com/questions/128598/collision-detection-point-hitting-a-rotating-rectangle

    if (Duedo.Rectangle.Intersects(a, b))
    {
        output.Location.X = Math.max(a.Location.X, b.Location.X);
        output.Location.Y = Math.max(a.Location.Y, b.Location.Y);
        output.Width = Math.min(a.Right, b.Right) - output.Location.X;
        output.Height = Math.min(a.Bottom, b.Bottom) - output.Location.Y;
    }

    return output;

};



Object.defineProperty(Duedo.Rectangle.prototype, "Left", {

    get: function () {
        return this.Location.X;
    },

    set: function (value)
    {
        if (value >= this.Right)
        {
            this.Width = 0;
        }
        else
        {
            this.Width = this.Right - value;
        }

        this.Location.X = value;
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "Right", {

    get: function () {
        return this.Location.X + this.Width;
    },

    set: function (value)
    {
        if (value <= this.X)
        {
            this.Width = 0;
        }
        else
        {
            this.Width = this.Location.X + value;
        }
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "Top", {

    get: function () {
        return this.Location.Y;
    },

    set: function (value)
    {
        if (value >= this.Bottom)
        {
            this.Height = 0;
            this.Location.Y = value;
        }
        else
        {
            this.Height = (this.Bottom - value);
        }
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "Bottom", {

    get: function () {
        return this.Location.Y + this.Height;
    },

    /*Check*/
    set: function (value)
    {
        if (value <= this.Location.Y)
        {
            this.Height = 0;
        }
        else
        {
            this.Height = (this.Location.Y - value);
        }
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "TopLeft", {

    get: function () {
        return new Duedo.Point(this.Location.X, this.Location.Y);
    },

    set: function (value)
    {
        this.Location.X = value.Location.X;
        this.Location.Y = value.Location.Y;
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "TopRight", {

    get: function () {
        return new Duedo.Point(this.Right, this.Top);
    },

    set: function (value)
    {
        /*
        this.X = value.X;
        this.Y = value.Y;
        */
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "BottomRight", {

    get: function () {
        return new Duedo.Point(this.Right, this.Bottom);
    },

    set: function (value)
    {
        this.Right = value.Location.X;
        this.Bottom = value.Location.Y;
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "Volume", {

    get: function () {
        return this.Width * this.Height;
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "HalfWidth", {

    get: function () {
        return this.Width / 2;
    }

});



Object.defineProperty(Duedo.Rectangle.prototype, "HalfHeight", {

    get: function () {
        return this.Height / 2;
    }

});



Duedo.Rectangle.prototype.CreatePath = function(context) {
    context.beginPath();
    context.rect(
        DUnits.M2P(this.Location.X) - DUnits.M2P(this.Width) * this.Anchor.X,
        DUnits.M2P(this.Location.Y) - DUnits.M2P(this.Height) * this.Anchor.Y,
        DUnits.M2P(this.Width),
        DUnits.M2P(this.Height)
    );
};
/*
==========================================
Polygon
Author: http://www.edoardocasella.it
Based on Core HTML5 Canvas by David Geary and some stuff from StackOverflow
==========================================
*/


/*

 Polygon points order

     P1-------------P2
     |               |
     |               |
     P4-------------P3

*/

Duedo.Polygon = function (points) {
    Duedo.Shape.call(this);
    this.Type = Duedo.POLYGON;
   
    this.StrokeStyle = 'blue';
    this.FillStyle   = 'white';
    this.Wireframe = false;

    this._init(points);
};


/*Inherit shape object*/
Duedo.Polygon.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Polygon.prototype.constructor = Duedo.Polygon;


Duedo.Polygon.prototype._init = function (points) {
    this._super();

    this.Points = points || null;

    if (Duedo.Utils.IsNull(this.Points))
        return;

    this.Location.X = this.Points[0].X;
    this.Location.Y = this.Points[0].Y;

    this.LastLocation = this.Location.Clone();

    return this;
};


Duedo.Polygon.prototype.Project = function (axis) {

    var scalars = [], v;

    v = new Duedo.Vector2();

    this.Points.forEach(function (point) {
        v.X = point.X;
        v.Y = point.Y;
        scalars.push(v.DotProduct(axis));
    });

    return new Duedo.Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
};


Duedo.Polygon.prototype.GetAxes = function () {

    var v1 = new Duedo.Vector2();
    var v2 = new Duedo.Vector2();
    var axes = [];

    for (var i = 0; i < this.Points.length - 1; i++) {

        v1.X = this.Points[i].X;
        v1.Y = this.Points[i].Y;

        v2.X = this.Points[i + 1].X;
        v2.Y = this.Points[i + 1].Y;

        axes.push(v1.Edge(v2).Normalize());
    }

    v1.X = this.Points[this.Points.length - 1].X;
    v1.Y = this.Points[this.Points.length - 1].Y;

    v2.X = this.Points[0].X;
    v2.Y = this.Points[0].Y;

    axes.push(v1.Edge(v2).Normalize());

    return axes;
};


Duedo.Polygon.prototype.AddPoint = function (x, y) {

    if (x instanceof Duedo.Point)
    {
        y = x.Y;
        x = x.X;
    }

    this.Points.push(new Duedo.Point(x, y));
    //The barycenter and area must be computed again
    this.Cache["cm"] = null;
    this.Cache["area"] = null;
};


Duedo.Polygon.prototype.GetPosition = function () {
    return this.Points[0];
};


/*http://stackoverflow.com/a/16391873*/
Duedo.Polygon.prototype.Contains = function (x, y) {
    
    var p = new Duedo.Point(x, y);

    // TODO PIXELS A METRI
    
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var inside = false;
    for (var i = 0, j = this.Points.length - 1 ; i < this.Points.length; j = i++ )
    {
        if ( ( this.Points[ i ].Y > p.Y ) != ( this.Points[ j ].Y > p.Y ) &&
             p.X < ( this.Points[ j ].X - this.Points[ i ].X ) * ( p.Y - this.Points[ i ].Y ) / ( this.Points[ j ].Y - this.Points[ i ].Y ) + this.Points[ i ].X )
        {
            inside = !inside;
        }
    }

    return inside;

};


Duedo.Polygon.prototype.CreatePath = function (context) {

    if (this.Points.length === 0)
        return;

    context.beginPath();
    context.moveTo(this.Points[0].X, this.Points[0].Y);

    for (var i = 0; i < this.Points.length; ++i)
        context.lineTo(this.Points[i].X, this.Points[i].Y);

    context.closePath();

};


Duedo.Polygon.prototype.Move = function (dx, dy) {

    for (var i = 0, point; i < this.Points.length; ++i) {
        this.Points[i].X += dx;
        this.Points[i].Y += dy;
    }


    this.Location = this.Points[0].Clone().AsVector();

    //Barycenter must be updated @FIX, center must be only translated
    this.Cache["cm"] = null;
};


Duedo.Polygon.prototype.Translate = function (x, y) {
    var tx = x - this.Points[0].X;
    var ty = y - this.Points[0].Y;
    this.Move(tx, ty);

    //Barycenter must be updated @FIX, center must be only translated
    this.Cache["cm"] = null;
};


/*
 * ScalePoints
 * to be used instead of GraphicObject.Scale (Duedo.Vector2) property
*/
Duedo.Polygon.prototype.ScalePoints = function (scaleValX, scaleValY) {

    for (var i in this.Points) {
        this.Points[i].X *= scaleValX;
        this.Points[i].Y *= scaleValY;
    }

    this.Location = this.Points[0].Clone().AsVector();


    //Barycenter must be updated
    this.Cache["cm"] = null;

};


Duedo.Polygon.prototype.Clone = function () {

    var clonedP = new Array();

    for (var i in this.Points) {
        clonedP[i].X = this.Points[i].X;
        clonedP[i].Y = this.Points[i].Y;
    }

    return new Duedo.Polygon(clonedP);
};


Duedo.Polygon.prototype.GetHeight = function () {
    throw 'getHeight() not implemented';
};


Duedo.Polygon.prototype.GetWidth = function () {
    throw 'getWidth() not implemented';
};

/*
 * Rotate
 * Default: around his CM
*/
Duedo.Polygon.prototype.Rotate = function (rad, origin) {
    
    if(!origin)
        origin = this.Center;

    for (var i in this.Points)
        this.Points[i].Rotate(rad, origin);


    this.Angle = rad;

    this.Location = this.Points[0].Clone().AsVector();

    //Barycenter must be updated
    this.Cache["cm"] = null;
};


/*Area*/
Duedo.Polygon.prototype.Area = function () {

    var area = 0, i, j, p1, p2;

    for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i, i++) {
        p1 = this.Points[i];
        p2 = this.Points[j];
        area += p1.X * p2.Y;
        area -= p1.Y * p2.X;
    }

    area /= 2;

    
    return area;
};


/*Centre of mass*/
/*CACHE??*/
Object.defineProperty(Duedo.Polygon.prototype, "Center", {

    get: function () {
        
        //Compute CM
        var x = 0, y = 0, i, j, f, point1, point2;

        for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i, i++) {
            point1 = this.Points[i];
            point2 = this.Points[j];
            f = point1.X * point2.Y - point2.X * point1.Y;
            x += (point1.X + point2.X) * f;
            y += (point1.Y + point2.Y) * f;
        }

        f = this.Area() * 6;

        return new Duedo.Point(x / f, y / f);
    }

});
/*
==========================================
Duedo.Circle
Author: http://www.edoardocasella.it
==========================================
*/
Duedo.Circle = function (v2, radius) {
    Duedo.Shape.call(this);
    this.Type = Duedo.CIRCLE;
    this.Radius = radius || undefined;

    this._init();
    this.Location.X = v2.X;
    this.Location.Y = v2.Y;
};



/*Inherit shape object*/
Duedo.Circle.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Circle.prototype.constructor = Duedo.Circle;



/*
 * Intersects
 * Static method
 * Check intersection between two circles
*/
Duedo.Circle.Intersects = function ( c1, c2 ) {

    // TODO CHECK AND UPDATE CODE

    var A, B, ABD;

    A = c2.Origin.X - c1.Origin.X;
    B = c2.Origin.Y - c1.Origin.Y;

    ABD = Math.sqrt( Math.pow(A, 2) + Math.pow(B, 2) );

    if(ABD < (c1.Radius + c2.Radius))
    {
        return true;
    }


    return false;

};


/*
 * Clone
 * Clone this object
*/
Duedo.Circle.prototype.Clone = function() {

    return new Duedo.Circle(this.Location.X, this.Location.Y, this.Radius);

};


/*
 * GetAxes
 * Circle must return undefined / infinite
*/
Duedo.Circle.prototype.GetAxes = function () {
    return undefined; //infinite
};


/*
 * Project
 * Project this circle along the axis represented by @axis
*/
Duedo.Circle.prototype.Project = function (axis) {
    
    var scalars = [];
    var point = new Duedo.Point();
    var dotProduct = new Duedo.Vector2(point).DotProduct(axis);

    scalars.push(dotProduct);
    scalars.push(dotProduct + this.Radius);
    scalars.push(dotProduct - this.Radius);


    return new Duedo.Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));

};


/*
 * Contains
 * @x: can be a vector2 or a scalar
 * @y: y coord
 * Check if this circle containes the point represented by the arguments
*/
Duedo.Circle.prototype.Contains = function(x, y) {

    if(x instanceof Duedo.Vector2)
    {
        y = x.Y;
        x = x.X;
    }

    if(this.Radius <= 0)
    {
        return false;
    }

    let objLoc = null;

    if(!this.FixedToViewport) {
    objLoc = this.Location.Clone()
        .Subtract( new Duedo.Vector2(x, y) )
        .Subtract(this.Game.Viewport.View.GetAsVector())
        .Double();
    } else {
        objLoc = this.ViewportOffset.Clone()
            .Subtract( new Duedo.Vector2(x, y) )
            .Double();
    }
    
    const r2 = this.Radius * this.Radius;

    return (objLoc.X + objLoc.Y <= r2);

};


/*
 * IntersectCircle
 * @cs: circle 2
 * Check if this circle intersects the circle represented by c2
*/
Duedo.Circle.prototype.IntersectCircle = function ( c2 ) {
    return Duedo.Circle.Intersects(this, c2);
};


/*
 * CreatePath
 * @context: 2d context
*/
Duedo.Circle.prototype.CreatePath = function (context) {
    context.beginPath();
    context.arc(
        DUnits.M2P(this.Location.X),
        DUnits.M2P(this.Location.Y),
        DUnits.M2P(this.Radius),
        0,
        Math.PI * 2,
        false
    );
};


/*
 * GetPosition
*/
Duedo.Circle.prototype.GetPosition = function () {
    return this.Origin;
};


/*
 * Origin
*/
Object.defineProperty(Duedo.Circle.prototype, "Origin", {

    get: function() {
        return this.Location;
    }

});


Object.defineProperty(Duedo.Circle.prototype, "Width", {

    get: function () { return this.Radius * 2; }

});

Object.defineProperty(Duedo.Circle.prototype, "Height", {

    get: function () { return this.Radius * 2; }

});

/*
==========================================
Duedo.Line
Author: http://www.edoardocasella.it
Thanks to: Phaser game engine
==========================================
*/

Duedo.Line = function (start /*Duedo.Point*/, end /*Duedo.Point*/) {
    Duedo.Shape.call(this);

    this.Type = Duedo.LINE;

    /*Setup*/
    this.Start = start;
    this.End = end;

    this.Location = this.Start;

    this.LineWidth = 0.1;

};


/*Inherit shape object*/
Duedo.Line.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Line.prototype.constructor = Duedo.Line;





Duedo.Line.prototype.Set = function (start, end) {
    this.Start = start;
    this.End   = end;
    return this;
};



Duedo.Line.prototype.Contains = function (x, y) {
    return this.PointOnLine(x, y);
};


Duedo.Line.prototype.Intersects = function (line, asSegment) {
    return Duedo.Line.Intersects(this.Start, this.End, line.Start, line.End, asSegment);
};


/**
* AS REPORTED IN: PHASER HTML5 GAME ENGINE
* Checks for intersection between two lines as defined by the given start and end points.
* If asSegment is true it will check for line segment intersection. If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersectsPoints
* @param {Point/Vector2} a - The start of the first Line to be checked.
* @param {Point/Vector2} b - The end of the first line to be checked.
* @param {Point/Vector2} e - The start of the second Line to be checked.
* @param {Point/Vector2} f - The end of the second line to be checked.
* @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @return {Duedo.Vector2} The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Duedo.Line.Intersects = function (a, b, e, f, asSegment) {
    
    if (typeof asSegment === 'undefined') { asSegment = true; }

    var result = new Duedo.Vector2(0, 0);

    var a1 = b.Y - a.Y;
    var a2 = f.Y - e.Y;
    var b1 = a.X - b.X;
    var b2 = e.X - f.X;
    var c1 = (b.X * a.Y) - (a.X * b.Y);
    var c2 = (f.X * e.Y) - (e.X * f.Y);
    var denom = (a1 * b2) - (a2 * b1);

    if (denom === 0) {
        return null;
    }

    result.X = ((b1 * c2) - (b2 * c1)) / denom;
    result.Y = ((a2 * c1) - (a1 * c2)) / denom;

    if (asSegment) {
        var uc = ((f.Y - e.Y) * (b.X - a.X) - (f.X - e.X) * (b.Y - a.Y));
        var ua = (((f.X - e.X) * (a.Y - e.Y)) - (f.Y - e.Y) * (a.X - e.X)) / uc;
        var ub = (((b.X - a.X) * (a.Y - e.Y)) - ((b.Y - a.Y) * (a.X - e.X))) / uc;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return result;
        }
        else {
            return null;
        }
    }

    return result;


};


Duedo.Line.prototype.PointOnLine = function (x, y) {
    /*
    if(!this.FixedToViewport) {
        objLoc = this.Location.Clone()
            .Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y))
            // make it relative to the canvas
            .Subtract(this.Game.Viewport.View.GetAsVector());
    } else {
        objLoc = this.ViewportOffset.Clone()
			.Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y));
    }
    */
    // todo Considera anche il width/height della linea
    // TODO la location a cosa corrisponde? Alla dimensione * l'ancora?
    // TODO se modifico la location modifico allo stesso tempo il punto A e il punto B della retta?
    return ((x - this.Start.X) * (this.End.Y - this.Start.Y) === (this.End.X - this.Start.X) * (y - this.Start.Y));
};


Duedo.Line.prototype.SetStart = function (start) {
    this.Start = start;
    return this;
};



Duedo.Line.prototype.SetEnd = function (end) {
    this.End = end;
    return this;
};



Duedo.Line.prototype.DistanceToEnd = function () {
    return this.Start.DistanceTo(this.End);
};



Duedo.Line.prototype.Clone = function () {
    return new Duedo.Line(this.Start.Clone(), this.End.Clone());
};



Duedo.Line.prototype.Copy = function (line) {
    this.Start.Copy(line.Start);
    this.End.Copy(line.End);
    return this;
};

Duedo.Line.prototype.SetStartX = function (x) {
    this.Start.X = x;
    return this;
};

Duedo.Line.prototype.SetStartY = function (y) {
    this.Start.Y = y;
    return this;
};

Duedo.Line.prototype.SetEndX = function (x) {
    this.End.X = x;
    return this;
};

Duedo.Line.prototype.SetEndY = function (y) {
    this.End.Y = y;
    return this;
};

Duedo.Line.prototype.CreatePath = function(context) {
    context.beginPath();
    context.lineWidth = DUnits.M2P(this.LineWidth); // line height
    context.moveTo(DUnits.M2P(this.Start.X), DUnits.M2P(this.Start.Y));
    context.lineTo(DUnits.M2P(this.End.X), DUnits.M2P(this.End.Y));
};


Duedo.Line.prototype.Rotate = function (rad, origin) {
    if (Duedo.Utils.IsNull(rad)) return;
    if (!origin)
        origin = this.Center;
    
    this.Start.Rotate(rad, origin);
    this.End.Rotate(rad, origin);
    return this;
};


Object.defineProperty(Duedo.Line.prototype, "Center", {
    get: function () {
        return new Duedo.Point(((this.Start.X + this.End.X) / 2), ((this.Start.Y + this.End.Y) / 2));
    }
});


Object.defineProperty(Duedo.Line.prototype, "Angle", {
    get: function() {
        return Math.atan2(this.End.Y - this.Start.Y, this.End.X - this.Start.X);
    }
});



Object.defineProperty(Duedo.Line.prototype, "Width", {
    get: function () {
        return Math.abs(this.Start.X - this.End.X);
    }
});

Object.defineProperty(Duedo.Line.prototype, "Height", {
    get: function () {
        return Math.abs(this.Start.Y - this.End.Y);
    }
});


Object.defineProperty(Duedo.Line.prototype, "Top", {

    get: function () {
        return Math.min(this.Start.Y, this.End.Y);
    }

});


Object.defineProperty(Duedo.Line.prototype, "Bottom", {

    get: function () {
        return Math.max(this.Start.Y, this.End.Y);
    }

});

Object.defineProperty(Duedo.Line.prototype, "Left", {

    get: function () {
        return Math.min(this.Start.X, this.End.X);
    }

});


Object.defineProperty(Duedo.Line.prototype, "Right", {

    get: function () {
        return Math.max(this.Start.X, this.End.X);
    }

});
/*
==============================
Duedo.Text
Author: http://www.edoardocasella.it
Notes: generic text object. Text can be wrapped using the \n. Text can have a body. 

Thanks to Phaser.js by Richard Davey
==============================
*/

/* NOTES
 FIXME: Add a cache property to prevent repeating the same operations
 ! If you want to use a custom font, be sure that has been loaded before creating a new text object
*/

//Consts
Duedo.SPACE_WIDTH; //initialized in Duedo.GameContext._initConstants();


Duedo.Text = function ( gameContext, text, location, style, name) {
    Duedo.GraphicObject.call(this);

    /*Avoid sending gameContext everytime*/
    arguments = [].slice.call(arguments);
    if (typeof gameContext == "string") {
        arguments.unshift(Duedo.Global.Games[0]);
    }

    this.Game = arguments[0];
    this.Type = Duedo.TEXT;
    
    /*Show text box*/
    this.Debug = false;

    this.Parent = null;

    /*Private vars*/
    this._Text = "text";
    this._LineSpacing = 0;

    // Fonts
    this._FontName = 'Arial';
    this._FontWeight = 'normal';
    this._FontSize = '15pt';

    /*@bool: text has been modified?*/
    this._Retouched;

    //Max line width (width)
    this.MaxLineWidth = 0;
    this.LineHeight = 0;
    this.LinesWidths = [];
    this.Lines = [];

    /*Text style*/
    this.Style = {};

    this.HorizontalAlign = "left";
    this.VerticalAlign = "top";

    this._init(arguments[1], arguments[2], arguments[3], arguments[4]);
};


/*Inherit graphic object*/
Duedo.Text.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Text.prototype.constructor = Duedo.Text;




/*Debug all the text element*/
Duedo.Text.DebugAll = false;





/*
 * Init
 */
Duedo.Text.prototype._init = function ( text, locationVec, style, name ) {
    this._super();


    if( text !== null && typeof text !== "undefined" )
    {
        this.Text = text;
    }

    if (locationVec !== null && typeof locationVec !== "undefined")
    {
        this.Location = locationVec;
    }

    /*Setup style*/
    this.SetStyle( style );

    this.Name = name || "text";

    this._Retouched = true;
};



/*
 * SetStyle
 * @mstyle: style {}
 */
Duedo.Text.prototype.SetStyle = function (mstyle) {
    

    mstyle = mstyle || {};

    // Font
    this._FontName             = mstyle.FontName        || "Arial";
    this._FontWeight           = mstyle.FontWeight      || "normal";
    this._FontSize             = mstyle.FontSize        || "15pt";

    // Style
    this.Style.Fill            = mstyle.Fill            || "black";
    this.Style.StrokeStyle     = mstyle.StrokeStyle     || "white";
    this.Style.StrokeThickness = mstyle.StrokeThickness || 0;
    this.Style.Align           = mstyle.Align           || "center";
    this.Style.WordWrap        = mstyle.WordWrap        || true;
    this.Style.WordWrapWidth   = mstyle.WordWrapWidth   || 100;
    this.Style.ShadowOffsetX   = mstyle.ShadowOffsetX   || 0;
    this.Style.ShadowOffsetY   = mstyle.ShadowOffsetY   || 0;
    this.Style.ShadowColor     = mstyle.ShadowColor     || "black";
    this.Style.ShadowBlur      = mstyle.ShadowBlur      || 0;
    this.Style.LineHeight      = mstyle.LineHeight      || 0;

    /* 
    if(document.fonts) {
        document.fonts.ready.then(() => {
            this._FontName = 'Titillium Web';
        });
    }
    */

};




Duedo.Text.prototype.GetBounds = function () { };


/*
 * Main update
 */
Duedo.Text.prototype.Update = function (deltaT) {
    this.SuperUpdate();


    //Text has been modified, so update internal data
    if(this._Retouched)
    {
        this.Lines = this.Text.split(/(?:\r\n|\r|\n)/);
        this._UpdateTextWidth();


        const fontHeight = this.DetermineFontHeight(`font-family:${this._FontName}`);
        //Calculate line height
        this.LineHeight = fontHeight + this.Style.StrokeThickness + this._LineSpacing + this.Style.ShadowOffsetY;

        this._Retouched = false;
    }
    

    this.UpdateAnimations(deltaT);
        
};



/*
 * _UpdateTextWidth
 * @private
 * Calculate the max width of this text
 * return width in meters
*/
Duedo.Text.prototype._UpdateTextWidth = function() {

    //calculate text width
    var lineWidth = 0;
    var ctx = this.Game.Renderer.Context;
    
    ctx.save();
    ctx.font = this.Font;

    for (var i = 0; i < this.Lines.length; i++)
    {
        
        lineWidth = this.Game.Renderer.Context.measureText(this.Lines[i]).width;
        
        this.LinesWidths[i] = lineWidth;
        
        this.MaxLineWidth = Math.max(this.MaxLineWidth, lineWidth);

        lineWidth = 0;
    }
    
    this.MaxLineWidth /= Duedo.Conf.PixelsInMeter;

    ctx.restore();

};



/*
 * PostUpdate
*/
Duedo.Text.prototype.PostUpdate = function(deltaT) {
 
    if(this.Body)
    {
        this.Body.Link();
    }

    /*Renderable*/ 
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
            ? 
                new Duedo.Vector2(this.Location.X - this.Width * this.Anchor.X, this.Location.Y - this.Height * this.Anchor.Y)
            : 
                new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    
};



/*
 * SetShadow
 */
Duedo.Text.prototype.SetShadow = function (x, y, color, blur) {

    this.Style.ShadowOffsetX = x || 0;
    this.Style.ShadowOffsetY = y || 0;
    this.Style.ShadowColor   = color || "black";
    this.Style.ShadowBlur    = 5;

};



/*
 * Draw
 */
Duedo.Text.prototype.Draw = function (context) {
    
    if(!this.Renderable) {
        return;
    }

    context.save();

    //Setup drawing context
    context.globalAlpha     = this.Alpha;
    context.fillStyle       = this.Style.Fill;
    context.strokeStyle     = this.Style.StrokeStyle;
    context.lineWidth       = this.Style.LineHeight;
    context.strokeThickness = this.Style.StrokeThickness;
    
    context.font = this.Font;
    context.fillStyle = this.Style.Fill;
    
    //Shadow
    //bug: shadow don't work while using MLTEXT.JS down here...
    context.shadowOffsetX   = this.Style.ShadowOffsetX;
    context.shadowOffsetY   = this.Style.ShadowOffsetY;
    context.shadowColor     = this.Style.ShadowColor;
    context.shadowBlur      = this.Style.ShadowBlur;
    
    var fn;
    
    if(this.Style.StrokeThickness)
        fn = "strokeText";

    if(this.Style.Fill)
    {
        if(fn === "strokeText")
            fn = "fillAndStrokeText";
        else
            fn = "fillText";
    }

    var height = this.Height;
    var width  = this.Width;

    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 )
    {
        context.translate(this.Location.X + (width * this.Anchor.X), this.Location.Y + (height * this.Anchor.Y));
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(this.Location.X +  (width * this.Anchor.X)), -(this.Location.Y + (height * this.Anchor.Y)));
    }
    
    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    context.mlFillOrStrokeText(
        this.Text,
        DToPixels(this.Location.X) - DToPixels(this.Width * this.Anchor.X),
        DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y),
        DToPixels(width), 
        DToPixels(height),
        this.VerticalAlign, 
        this.HorizontalAlign, 
        DToPixels(this.LineHeight + this.LineSpacing),
        fn);      
    
    /*Show text box*/
    if(this.Debug || Duedo.Text.DebugAll) {
        context.strokeStyle = 'orange';
        context.rect(
            DToPixels(this.Location.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y), 
            DToPixels(this.Width),
            DToPixels(this.Height)
        );
        context.stroke();
        context.font = '12px arial';
        context.fillStyle = 'orange';
        context.fillText(`Text X:${this.Location.X.toFixed(0)} Y:${this.Location.Y.toFixed(0)}`, 
            DToPixels(this.Location.X) - DToPixels(this.Width * 0.5),
            DToPixels(this.Location.Y - 0.1) - DToPixels(this.Height * 0.5)
        );
    }

    context.restore();
    

};



/*
 * DetermineFontHeight
 * @public
*/
Duedo.Text.prototype.DetermineFontHeight = function(fontStyle)
{
    var body      = document.getElementsByTagName('body')[0];
    var temp      = document.createElement('div');
    var tempText  = document.createTextNode('M');
    
    temp.appendChild(tempText);
    temp.setAttribute('style', fontStyle + ';position:absolute;top:0;left:0');
    body.appendChild(temp);
    

    result = temp.offsetHeight;

    body.removeChild(temp);

    return result / Duedo.Conf.PixelsInMeter;
};



/*
 * Height
 * return height in meters
*/
Object.defineProperty(Duedo.Text.prototype, "Height", {

    get: function () {
        return ((this.DetermineFontHeight("font:" + this.Style.Font + ";") + this.Style.StrokeThickness + this.LineSpacing) * this.Lines.length);
    }

});



/*
 * HalfHeight
 * return text half height in meters
*/
Object.defineProperty(Duedo.Text.prototype, "HalfHeight", {
    get: function() {
        return this.Height / 2;
    } 
});



/*
 * Width
 * return text width in meters
*/
Object.defineProperty(Duedo.Text.prototype, "Width", {
    get: function() {
        this._UpdateTextWidth();
        return this.MaxLineWidth;
    } 
});



/*
 * HalfWidth
 * return text half width in meters
*/
Object.defineProperty(Duedo.Text.prototype, "HalfWidth", {
    get: function() {
        //this._UpdateTextWidth();
        return this.MaxLineWidth / 2;
    } 
});



/*
 * Text
 * @val: string - text 
*/
Object.defineProperty(Duedo.Text.prototype, "Text", {

    set: function ( val ) {
        this._Text = val.toString();
        this._Retouched = true;
    },

    get: function() {
        return this._Text;
    }

});


/*
 * FontName
 * @val: string
*/
Object.defineProperty(Duedo.Text.prototype, "FontName", {

    set: function (val) {
        this._FontName = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontName;
    }

});


/*
 * FontSize
 * @val: number - font size
*/
Object.defineProperty(Duedo.Text.prototype, "FontSize", {

    set: function (val) {
        if(!isNaN(val)) {
            val = val + 'px';
        }
        this._FontSize = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontSize;
    }

});



/*
 * FontWeight
 * @val: number - font weight
*/
Object.defineProperty(Duedo.Text.prototype, "FontWeight", {

    set: function (val) {
        this._FontWeight = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontWeight;
    }

});



/**
* LineSpacing
* @number: Additional spacing (in pixels) between each line of text if multi-line.
*/
Object.defineProperty(Duedo.Text.prototype, 'LineSpacing', {

    get: function() {
        return this._LineSpacing;
    },

    set: function(value) {

        if (value !== this._LineSpacing)
        {
            this._LineSpacing = parseFloat(value);
            this._Retouched = true;
        }

    }

});



/**
* StrokeThickness
* A shortcut to this.Style.StrokeThickness
*/
Object.defineProperty(Duedo.Text.prototype, "StrokeThickness", {
    set: function(val) {
        this.Style.StrokeThickness = parseFloat(val);
    },
    get: function() {
        return this.Style.StrokeThickness;
    }
});



/**
* StrokeStyle
* A shortcut to this.Style.StrokeStyle
*/
Object.defineProperty(Duedo.Text.prototype, "StrokeStyle", {
    set: function(val) {
        this.Style.StrokeStyle = val;
    },
    get: function() {
        return this.Style.StrokeStyle;
    }
});



/**
* Font
* An overall of the font
*/
Object.defineProperty(Duedo.Text.prototype, "Font", {
    get: function() {
        return this._FontWeight + ' ' + this._FontSize + ' ' + this._FontName;
    }
});





/*
 * MLTEXT.JS by Jordi Baylina
 * Library: mllib.js
 * Desciption: Extends the CanvasRenderingContext2D that adds two functions: mlFillText and mlStrokeText.
 * The prototypes are: 
 * function mlFillText(text,x,y,w,h,vAlign,hAlign,lineheight);
 * function mlStrokeText(text,x,y,w,h,vAlign,hAlign,lineheight);
 *
 * Where vAlign can be: "top", "center" or "button"
 * And hAlign can be: "left", "center", "right" or "justify"
 * Author: Jordi Baylina. (baylina at uniclau.com)
 * License: GPL
 * Date: 2013-02-21
*/
function mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fn) {
    
    text = text.replace(/[\n]/g, " \n ");
    text = text.replace(/\r/g, "");

    var words = text.split(/[ ]+/);

    var sp;
    
    if(!Duedo.Text.SPACE_WIDTH)
        sp = this.measureText(' ').width;
    else sp = Duedo.Text.SPACE_WIDTH;

    var lines = [];
    var actualline = 0;
    var actualsize = 0;
    var wo;

    lines[actualline] = {};
    lines[actualline].Words = [];

    i = 0;
    while (i < words.length) 
    {
        var word = words[i];

        if (word == "\n") 
        {
            lines[actualline].EndParagraph = true;
            actualline++;
            actualsize = 0;
            lines[actualline] = {};
            lines[actualline].Words = [];
            i++;
        } 
        else 
        {
            wo = {};
            wo.l = this.measureText(word).width;

            if (actualsize === 0) 
            {
                while (wo.l > w) 
                {
                    word = word.slice(0, word.length - 1);
                    wo.l = this.measureText(word).width;
                }

                if (word === "") return; // I can't fill a single character

                wo.word = word;
                lines[actualline].Words.push(wo);
                actualsize = wo.l;
                if (word != words[i]) 
                {
                    words[i] = words[i].slice(word.length, words[i].length);
                } 
                else 
                {
                    i++;
                }
            } 
            else 
            {
                if (actualsize + sp + wo.l > w) 
                {
                    lines[actualline].EndParagraph = false;
                    actualline++;
                    actualsize = 0;
                    lines[actualline] = {};
                    lines[actualline].Words = [];
                } 
                else 
                {
                    wo.word = word;
                    lines[actualline].Words.push(wo);
                    actualsize += sp + wo.l;
                    i++;
                }
            }
        }
    }
    
    if (actualsize === 0) 
        lines[actualline].pop();
    
    lines[actualline].EndParagraph = true;

    var totalH = lineheight * lines.length;
    while (totalH > h) 
    {
        lines.pop();
        totalH = lineheight * lines.length;
    }

    var yy;
    if (vAlign == "bottom") 
    {
        yy = y + h - totalH + lineheight;
    } 
    else if (vAlign == "center") 
    {
        yy = y + h / 2 - totalH / 2 + lineheight;
    } 
    else 
    {
        yy = y + lineheight;
    }

    var oldTextAlign = this.textAlign;
    this.textAlign = "left";

    for (var li in lines) 
    {
        var totallen = 0;
        var xx, usp;

        for (wo in lines[li].Words) 
            totallen += lines[li].Words[wo].l;

        if (hAlign == "center") 
        {
            usp = sp;
            xx = x + w / 2 - (totallen + sp * (lines[li].Words.length - 1)) / 2;
        } 
        else if ((hAlign == "justify") && (!lines[li].EndParagraph)) 
        {
            xx = x;
            usp = (w - totallen) / (lines[li].Words.length - 1);
        } 
        else if (hAlign == "right") 
        {
            xx = x + w - (totallen + sp * (lines[li].Words.length - 1));
            usp = sp;
        } 
        else 
        { // left
            xx = x;
            usp = sp;
        }
        for (wo in lines[li].Words) 
        {
            if (fn == "fillText") 
            {
                this.fillText(lines[li].Words[wo].word, xx, yy);
            } 
            else if (fn == "strokeText") 
            {
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }
            else if(fn == "fillAndStrokeText")
            {
                this.fillText(lines[li].Words[wo].word, xx, yy);
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }

            xx += lines[li].Words[wo].l + usp;
        }

        yy += lineheight;
    }

    this.textAlign = oldTextAlign;
}





/*
 * mlInit
 * Makes available the ml extension
 * Author: Jordi Baylina
*/
(function mlInit() {

    CanvasRenderingContext2D.prototype.mlFunction = mlFunction;

    CanvasRenderingContext2D.prototype.mlFillText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "fillText");
    };

    CanvasRenderingContext2D.prototype.mlStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "strokeText");
    };

    CanvasRenderingContext2D.prototype.mlFillOrStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight, fillorstroke) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fillorstroke);
    };



})();
/*
==============================
Duedo.Layer
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Layer = function ( gameContext, image ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.LAYER;
    this.Parent;
    this._init(image);
};


/*Inherit renderable*/
Duedo.Layer.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Layer.prototype.constructor = Duedo.Layer;


/*
 * _init
*/
Duedo.Layer.prototype._init = function( image ) {
    this._super();

    if(!image instanceof Duedo.Image) {
        image = new Duedo.Image(this.Game, image);
    }

    if(!Duedo.Utils.IsNull(image))
    {
        this.Source = image;

        /*FIX:: SE E' UNA SPRITESHEET LA DIMENSIONE E' QUELLA DEL FRAME*/
        this._Width = this.Source.Width;
        this._Height = this.Source.Height;
    }

};



/*
 * Draw
*/
Duedo.Layer.prototype.Draw = function(context2d) {
    this.DrawLayer(this.Source, context2d, this.Source.Location);
};



/*
 * DrawLayer
*/
Duedo.Layer.prototype.DrawLayer = function(source, context2d, location) {
    source.Draw(context2d, location);
};




/*
 * Width
 * @public
 * Width of this image
*/
Object.defineProperty(Duedo.Layer.prototype, "Width", {
    get:function() {
        return this._Width * this.Scale.X;
    },
    set:function(val) {
        this.Scale.X = val / this._Width;
        this._Width = val;
    }
});



/*
 * Height
 * @public
 * Height of this image
*/
Object.defineProperty(Duedo.Layer.prototype, "Height", {
    get:function() {
        return this._Height * this.Scale.Y;
    },
    set:function(val) {
        this.Scale.Y = val / this._Height;
        this._Height = val;
    }

});


/*
==============================
Duedo.Parallax
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Parallax = function (gameContext) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.PARALLAX;
    
    /*Distance from camera*/
    this.Distance = 4;
    /*This parallax velocity*/
    this.Velocity = 4;

    this.Layers = [];
    
    this._init();

};


/*Inherit graphic object*/
Duedo.Parallax.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Parallax.prototype.constructor = Duedo.Parallax;



/*
 * _init
*/
Duedo.Parallax.prototype._init = function () {
    this._super();

    // Anchor default
    this.Anchor.X = 0;
    this.Anchor.Y = 0;
};




/*
 * AddLayer
*/
Duedo.Parallax.prototype.AddLayer = function ( layer ) {
    
    if (Duedo.Utils.IsNull(layer) || !layer instanceof Duedo.Layer)
    {
        throw "Duedo.Parallax.addLayer: needs Duedo.Layer";
    }
    else
    {
        if(Duedo.Utils.IsNull(layer.Source.Z) || layer.Source.Z === 0)
        {
            layer.Source.Z = (this.Z + this.Layers.length);
        }
        
        layer.Parent = this;

        // Inherit anchor
        layer.Source.Anchor.X = this.Anchor.X;
        layer.Source.Anchor.Y = this.Anchor.Y;

        // Inherit scale
        layer.Source.Scale.X = this.Scale.X;
        layer.Source.Scale.Y = this.Scale.Y;

        this.Layers.push(layer);

        /*...then free it into the world*/
        this.Game.Add(layer.Source);
    }
    
    return this;

};



/*
 * Update
*/
Duedo.Parallax.prototype.Update = function ( deltaT ) {

    var relVel;
    var offset;

    offset = new Duedo.Vector2(0, 0);
    relVel = this.Distance;
    
    for (var i = this.Layers.length - 1; i >= 0; i--)
    {

        Layer = this.Layers[i];

        /*Translate layer*/
        if (this.Game.Viewport.Translation.Magnitude() > 0)
        {
            
            relVel = this.Velocity * (Layer.Source.Z + 2);
            // Todo, zoom etc RIPETI LAYER
            offset.X = ((this.Game.Viewport.Translation.X * relVel) / (this.Game.Viewport.View.Width));
            offset.Y = ((this.Game.Viewport.Translation.Y * relVel) / (this.Game.Viewport.View.Height / 2));

            /*Negate direction*/
            offset.Negate().MultiplyScalar(0.6);

            /*Translate layer*/
            Layer.Source.Location.X += offset.X;
            Layer.Source.Location.Y += offset.Y;
        }

        if(!Duedo.Utils.IsNull(Layer["Update"]))
        {
            Layer.Source.Update(deltaT);
        }
      
    }

};



/*
 * PostUpdate
*/
Duedo.Parallax.prototype.PostUpdate = function(deltaT) {

};












/*
==============================
Duedo.Particle
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Particle = function (gameContext) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Game;
    this.TYPE = Duedo.PARTICLE;
    
    /*Parent particle system*/
    this._Parent;

    /*Particle current direction*/
    this.Velocity = new Duedo.Vector2(0, 0);
    this.Acceleration = new Duedo.Vector2(0, 0);
    this.MaxSpeed = 1;

    /*Particle size*/
    this.Size = 0;
    this.SizeSmall = 0;
    this.Mass;

    /*As "born" time*/
    this.StartTime;

    /*Lifespan*/
    this.Life;
    this.TimeToLive = 0;

    /*Alpha - texturized particle*/
    /*this.Alpha already defined in GraphicObject*/
    this.InitialAlpha;

    /*RGBA colour*/
    this.Colour = [];

    this.DrawColour = "";

    this.DeltaColour = [];

    this.Sharpness = 0;

    /*Init particle*/
    this._init();
}



/*Inherit graphic object*/
Duedo.Particle.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Particle.prototype.constructor = Duedo.Particle;


Duedo.Particle.prototype._init = function () {
    return this._super();
};



/*Main update*/
Duedo.Particle.prototype.Update = function ( deltaT ) {

    /*FIX: ADD deltaT*/
    //Apply gravity
    this.ApplyForce(this._Parent.Gravity.Clone().MultiplyScalar(this.Mass));

    this.Velocity.Add(this.Acceleration);
    this.FixVelocity();
    this.Location.Add(this.Velocity);


    this.TimeToLive -= deltaT;

    if (this._Parent.Texture !== null)
    {
        this._UpdateTexturizedParticle( deltaT );
    }
    else
    {
        this._UpdateSimpleParticle( deltaT );
    }


    this.Renderable = this.CheckViewportIntersection();



    return this;
};




/*
 * Update texturized particle
*/
Duedo.Particle.prototype._UpdateTexturizedParticle = function ( deltaT ) {


    /*Update texture alpha*/
    this.Alpha = this.InitialAlpha - (this.Game.ElapsedTime - this.StartTime) / this.Life;

    this.Alpha *= this.Game.World.Alpha;


    if (this.Alpha <= 0)
    {
        this.Alpha = 0;
        this.Renderable = false;
    }
       

    return this;

};




/*
* Update simple particle
*/
Duedo.Particle.prototype._UpdateSimpleParticle = function ( deltaT ) {

    var r, g, b, a;
    var draw;


    r = this.Colour[0] += (this.DeltaColour[0] * deltaT);
    g = this.Colour[1] += (this.DeltaColour[1] * deltaT);
    b = this.Colour[2] += (this.DeltaColour[2] * deltaT);
    a = this.Colour[3] += (this.DeltaColour[3] * deltaT);


    draw = [];

    draw.push("rgba(" + (r > 255 ? 255 : r < 0 ? 0 : ~~r));
    draw.push(g > 255 ? 255 : g < 0 ? 0 : ~~g);
    draw.push(b > 255 ? 255 : b < 0 ? 0 : ~~b);

    /*Adjust by world alpha*/
    a *= this.Game.World.Alpha;

    draw.push((a > 1 ? 1 : a < 0 ? 0 : a.toFixed(2)) + ")");

    this.DrawColour = draw.join(",");


    return this;

};



/*
 * Apply force
*/
Duedo.Particle.prototype.ApplyForce = function ( vec2 ) {
    this.Acceleration.Add( vec2.DivideScalar(this.Mass) );
};




/*
 * Fix velocity
*/
Duedo.Particle.prototype.FixVelocity = function () {
    
    var toFix = ["X", "Y"];

    for( var i in toFix )
    {
        if (this.Velocity[toFix[i]] < -this.MaxSpeed)
            this.Velocity[toFix[i]] = -this.MaxSpeed;

        if (this.Velocity[toFix[i]] > this.MaxSpeed)
            this.Velocity[toFix[i]] = this.MaxSpeed;
    }
};




/*
 * Check viewport intersection
*/
Duedo.Particle.prototype.CheckViewportIntersection = function () {
    
    var pBBox = null;

    /*Particle visibility*/
    if (this._Parent.Texture !== null)
    {
        pBBox = new Duedo.Rectangle(this.Location, this._Parent.TextureDim.Width, this._Parent.TextureDim.Height);
    }
    else
    {
        /*Viewport "intersection test" expects a size of at least 1*/
        pBBox = new Duedo.Rectangle(this.Location, this.Size || 1, this.Size || 1);
    }


    return this.Game.Viewport.Intersects(pBBox);

};
/*
==============================
Duedo.ParticleSystem
Author: http://www.edoardocasella.it
Thanks to: mrspeaker.net && 71squared.com
view-source:http://www.mrspeaker.net/dev/parcycle/

==============================
*/


Duedo.ParticleSystem = function( gameContext, name ){
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.PARTICLE_SYSTEM;
    
    this._Parent;

    this.Initialized = false;

    /*Status*/
    this.MaxParticles = 300;
	this.Particles = [];
	this.Active = true;
	this.IsDead = true;

	/*Location random*/
	this.LocationRandom = new Duedo.Vector2(0, 5);

    /*Size*/
	this.Size = 0.5;
	this.SizeRandom = 0.1;

    /*Speed*/
	this.Speed = 0.005;
	this.SpeedRandom = 0.01;
	this.MaxSpeed = 0.3;

    /*Lifespan*/
	this.LifeSpan = 1;
	this.LifeSpanRandom = 1;

    /*Angle (rad) */
	this.Angle = 0;
	this.AngleRandom = 0;

    /*Gravity*/
	this.Gravity = new Duedo.Vector2(0, -0.01);

    /*Texture*/
	this.Texture = null;
	this.TextureAlpha = 1;
	this.TextureDim = new Duedo.Dimension(0.7, 0.7);

    /*Colour*/
	this.StartColour        = [ 255, 255, 255, 1 ];
	this.StartColourRandom  = [ 10, 10, 10, 0.1 ];
	this.FinishColour       = [ 0, 0, 0, 0 ];  
	this.FinishColourRandom = [ 10, 10, 10, 0 ];

    /*Sharpness*/
	this.Sharpness = 1;
	this.SharpnessRandom = 5;

    /*Mass*/
	this.Mass = 0.5;
	this.MassRandom = 1;

    /*Timing*/
	this.ElapsedTime = 0;
	this.Duration = Infinity;

    /*Emission*/
	this.EmissionRate = 0;
	this.EmitCounter = 0;
	this.ParticleIndex = 0;
	this.ParticleCount = 0;

    /*Global composite operations*/
	this.BlendMode = Duedo.BlendModes.LIGHTER;


	this._init( name );
}




/*Inherit graphic object*/
Duedo.ParticleSystem.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.ParticleSystem.prototype.constructor = Duedo.ParticleSystem;


/*
Particle system bindable events
- death
- update
*/




/*
 * _init
 * @private
*/
Duedo.ParticleSystem.prototype._init = function ( name ) {
    this._super();


    this.EmissionRate = this.MaxParticles / this.LifeSpan;
    this.EmitCounter = 0;
    this.IsDead = false;
    this.Initialized = true;

    this.Name = name || "particlesystem";

    return this;
};




/*
 * Activate
 * @public
 * Activate this ps
*/
Duedo.ParticleSystem.prototype.Activate = function () {
    this.Active = true;
    return this;
};







/*
 * Stop
 * @public
 * Stop this ps
*/
Duedo.ParticleSystem.prototype.Stop = function () {

    this.Active      = false;
    this.ElapsedTime = 0;
    this.EmitCounter = 0;


    return this;
};







/*
 * Load
 * @ublic
 * Load ps configuration from JSON data
*/
Duedo.ParticleSystem.prototype.Load = function ( configurationJSON ) {


    if( typeof configurationJSON === "undefined" )
    {
        return;
    }
    
    var cfg = JSON.parse(configurationJSON);

    if( typeof cfg["Properties"] !== "undefined" )
    {
        
        for( var index in cfg["Properties"] )
        {
            switch( index )
            {
                case "Location":
                case "LocationRandom":
                case "Gravity":
                    var vcoord = cfg["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Vector2(Number(vcoord[0]), Number(vcoord[1]));
                    break;

                case "Texture":
                    if( cfg["Properties"][index] instanceof Array )
                    {
                        
                        var tarray = [];

                        for( var i in cfg["Properties"][index] )
                        {
                            tarray.push(this.Game.Cache.GetImage(cfg["Properties"][index][i]));
                        }

                        this[index] = tarray;
                    }
                    else
                    {
                        this[index] = cfg["Properties"][index];
                    }
                    break;

                case "TextureDim":
                    var ddata = cfg["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Dimension(Number(ddata[0]), Number(ddata[1]));
                    break;

                default:
                    this[index] = cfg["Properties"][index];
                    break;
                    
            }
        }
    }
    
    


};







/*
 * _AddParticle
 * @private
 * Add a particle to this ps
*/
Duedo.ParticleSystem.prototype._AddParticle = function () {

    if (this.ParticleCount == this.MaxParticles)
    {
        return false;
    }

    var /*Duedo.Particle*/ particle;

    particle = new Duedo.Particle(this.Game);

    this._InitParticle(particle);
    this.Particles[this.ParticleCount] = particle;


    this.ParticleCount++;



    return this;
};









/*
 * _InitParticle
 * @private
*/
Duedo.ParticleSystem.prototype._InitParticle = function (particle) {


    var newAngle, vector, vectorSpeed;

    particle._Parent = this;

    particle.StartTime = this.Game.ElapsedTime;

    particle.Location.X = this.Location.X + this.LocationRandom.X * Duedo.Utils.RandM1T1();
    particle.Location.Y = this.Location.Y + this.LocationRandom.Y * Duedo.Utils.RandM1T1();

    newAngle    = (this.Angle + this.AngleRandom * Duedo.Utils.RandM1T1()) / 30;
    vector      = new Duedo.Vector2(Math.cos(newAngle), Math.sin(newAngle)); // Could move to lookup for speed
    vectorSpeed = this.Speed + this.SpeedRandom * Duedo.Utils.RandM1T1() / 30;


    vector.MultiplyScalar(vectorSpeed);
    particle.Velocity = vector;
    particle.MaxSpeed = this.MaxSpeed;

    particle.Alpha = this.TextureAlpha;
    particle.InitialAlpha = particle.Alpha;

    particle.Size       = this.Size + this.SizeRandom * Duedo.Utils.RandM1T1();
    particle.Size       = particle.Size < 0 ? 0 : ~~particle.Size;
    particle.Mass       = Duedo.Utils.RandInRange(this.Mass, this.MassRandom);
    particle.TimeToLive = this.LifeSpan + this.LifeSpanRandom * Duedo.Utils.RandM1T1();
    

    particle.Life = particle.TimeToLive;

    particle.Sharpness = this.Sharpness + this.SharpnessRandom * Duedo.Utils.RandM1T1();
    particle.Sharpness = particle.Sharpness > 100 ? 100 : particle.Sharpness < 0 ? 0 : particle.Sharpness;

    // internal circle gradient size - affects the sharpness of the radial gradient
    particle.SizeSmall = ~~((particle.Size / 200) * particle.Sharpness); //(size/2/100)

    var start =
    [
        this.StartColour[0] + this.StartColourRandom[0] * Duedo.Utils.RandM1T1(),
        this.StartColour[1] + this.StartColourRandom[1] * Duedo.Utils.RandM1T1(),
        this.StartColour[2] + this.StartColourRandom[2] * Duedo.Utils.RandM1T1(),
        this.StartColour[3] + this.StartColourRandom[3] * Duedo.Utils.RandM1T1()
    ];

    var end =
    [
        this.FinishColour[0] + this.FinishColourRandom[0] * Duedo.Utils.RandM1T1(),
        this.FinishColour[1] + this.FinishColourRandom[1] * Duedo.Utils.RandM1T1(),
        this.FinishColour[2] + this.FinishColourRandom[2] * Duedo.Utils.RandM1T1(),
        this.FinishColour[3] + this.FinishColourRandom[3] * Duedo.Utils.RandM1T1()
    ];


    particle.Colour = start;
    particle.DeltaColour[0] = (end[0] - start[0]) / particle.TimeToLive;
    particle.DeltaColour[1] = (end[1] - start[1]) / particle.TimeToLive;
    particle.DeltaColour[2] = (end[2] - start[2]) / particle.TimeToLive;
    particle.DeltaColour[3] = (end[3] - start[3]) / particle.TimeToLive;

    

    return this;
};




/*
 * PreUpdate
*/
Duedo.ParticleSystem.prototype.PreUpdate = function() {

};



/*
 * Update
 * @public
*/
Duedo.ParticleSystem.prototype.Update = function (deltaT) {
    this.SuperUpdate();
    
    var rate, p;
    
    /*Update linked animations*/
    this.UpdateAnimations(deltaT);

    if (this.Active && this.EmissionRate > 0)
    {

        rate = 1 / this.EmissionRate;

        this.EmitCounter += deltaT;

        while (this.ParticleCount < this.MaxParticles && this.EmitCounter > rate)
        {
            this._AddParticle();
            this.EmitCounter -= rate;
        }


        if (typeof deltaT !== "undefined")
        {
            this.ElapsedTime += deltaT;
        }


        if (!this.IsAlive)
        {
            this.Stop();
        }
        
    }

    
    this.ParticleIndex = 0;


    /*Check system death*/
    if (this.ParticleCount === 0 && this.Active === false)
    {
        this.IsDead = true;
        this.InUse = false;
        this._CallTriggers("death");
    }
    
    

    while (this.ParticleIndex < this.ParticleCount)
    {

        p = this.Particles[this.ParticleIndex];

        p.Update(deltaT);
        
        if (p.TimeToLive > 0)
        {
            this.ParticleIndex++;
        }
        else
        {
            // Replace particle with the last active 
            if (this.ParticleIndex != this.ParticleCount - 1)
            {
                this.Particles[this.ParticleIndex] = this.Particles[this.ParticleCount - 1];
            }

            this.ParticleCount--;

        }
    }
    

    this._CallTriggers("update");

    return this;

};




/*
 * PostUpdate
*/
Duedo.ParticleSystem.prototype.PostUpdate = function() {

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    
};




/*
 * Draw
 * @public
*/
Duedo.ParticleSystem.prototype.Draw = function ( context ) {

    context.save();


    if (this.BlendMode !== "")
    {
        context.globalCompositeOperation = this.BlendMode;
    }


    for (var i = 0, j = this.ParticleCount; i < j; i++)
    {

        var particle, size, halfSize, x, y, radgrad;

        particle = this.Particles[i];
        
        if( !particle.Renderable )
        {
            continue;
        }

        size = particle.Size;
        halfSize = size >> 1;

        x = ~~particle.Location.X;
        y = ~~particle.Location.Y;

        
        if (this.Texture === null)
        {

            // context.arc(DToPixels(x), DToPixels(y), DToPixels(size), 0, Math.PI * 2, false);
            // context.fillStyle = context.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
            
            // radgrad = context.createRadialGradient(x + halfSize, y + halfSize, particle.SizeSmall, x + halfSize, y + halfSize, halfSize);
            radgrad = context.createRadialGradient(
                DToPixels(x),
                DToPixels(y),
                DToPixels(particle.SizeSmall),
                DToPixels(x),
                DToPixels(y),
                DToPixels(halfSize)
            );
            radgrad.addColorStop(0, particle.DrawColour);
            radgrad.addColorStop(1, 'rgba(0,0,0,0)'); //Super cool if you change these values (and add more colour stops)
            context.fillStyle = radgrad;
            // context.fillRect(DToPixels(x), DToPixels(y), DToPixels(size), DToPixels(size));
            context.fillRect(
                DToPixels(x) - DToPixels(size * this.Anchor.X),
                DToPixels(y) - DToPixels(size * this.Anchor.Y),
                DToPixels(size),
                DToPixels(size)
            );
            
        }
        else
        {
            /*Texturized particle system*/
            var width, height, tToDraw;

            width = this.TextureDim.Width;
            height = this.TextureDim.Height;

            /*Choice a random texture*/
            if (this.Texture instanceof Array)
            {
                tToDraw = this.Texture[Math.floor((Math.random() * (this.Texture.length)) + 0)];
            }
            else
            {
                tToDraw = this.Texture;
            }

            context.save();
            context.globalAlpha = particle.Alpha;
            context.drawImage(tToDraw, DToPixels(x) - DToPixels(width / 2), DToPixels(y) - DToPixels(height / 2), DToPixels(width), DToPixels(height));
            context.restore();
        }


        
    }



    context.restore();


    return this;
};






/*
 * IsAlive
 * @public
 * Check if this particle system is currently living
*/
Object.defineProperty(Duedo.ParticleSystem.prototype, "IsAlive", {

    get: function () {
        return (this.Duration > this.ElapsedTime);
    },

});
/*
==============================
Duedo.SSequence
Author: http://www.edoardocasella.it

Notes:
SpriteSheet frames sequence

Bindable triggers:
#ended: when sequence routine is finished
#repeatrepached: was repeated maximum times
==============================
*/

Duedo.SSequence = function(gameContext, name) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.SSEQUENCE;
	
	this.Frames;
	this.SpriteSource;
	this.FrameIndex;
	this.Active;
	this.Rate = 1;
	this.Repeat = Infinity;
	this.Reverse = false;
	this._Expired = false;
	this._init(name);

};


/*Inherit GraphicObject*/
Duedo.SSequence.prototype = Object.create(Duedo.Object.prototype);
Duedo.SSequence.prototype.constructor = Duedo.SSequence;



/*
 * _init
 * @public
*/
Duedo.SSequence.prototype._init = function(sname) {

	this.Frames     = [];
	this.FrameIndex = 0;
	this.Active     = true;
	this.Name 		  = sname || "sequence_" + this.Parent.SequencesLength;

};

/*
 * Reset
 * @public
*/
Duedo.SSequence.prototype.Reset = function() {
	this.FrameIndex = 0;
	return this;
};

/*
 * Activate
 * @public
*/
Duedo.SSequence.prototype.Activate = function() {
	this.Active = true;
	return this;
};


/*
 * Expired
 * @public
*/
Duedo.SSequence.prototype.SetExpired = function(val) {
	return this._Expired = val;
};

/*
 * Expired
 * @public
*/
Duedo.SSequence.prototype.IsExpired = function() {
	return this._Expired;
};
/*
==============================
Duedo.SpriteSheet
Author: http://www.edoardocasella.it

Notes:
SpriteSheet object

Dimension is: this.FrameWidth(), this.FrameHeight()

Bindable (.Bind) events:
repeatreached - When the sequence has reached its maximum number of repetitions
repeated - When the sequence has completed a sequence
destroy - When the sprite was destroyed
start - When the sprite has triggered the sequence
==============================
*/


Duedo.SpriteSheet = function ( gameContext, bufferedImage, name ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.SPRITESHEET;
    
    /*Private*/
    this._Parent;
    this._ElapsedTime;
    this._Sequences;
    this._Repeated;

    /*Public*/
    this.Repeat;
    this.AutoDestroy;
    this.ActiveSequence;
    this.Playing;
    this.Debug = false;
    this.Rate; /*0.05s*/
    this.FrameIndex;
    /*Current frame*/
    this.Frame;
    /*Initialize*/
    this._init( bufferedImage, name );

};




/*Inherit GraphicObject*/
Duedo.SpriteSheet.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.SpriteSheet.prototype.constructor = Duedo.SpriteSheet;




/*
 * _init
 * @private
*/
Duedo.SpriteSheet.prototype._init = function ( bufferedImage, name) {
    this._super();

    this._Repeated       = 0;
    this._ElapsedTime    = 0;
    this._Sequences      = new Object();
    this.Repeat          = Infinity;
    this.AutoDestroy     = false;
    this.ActiveSequence  = null;
    this.Playing         = false;
    this.Rate            = 0.05;
    this.FrameIndex      = 0;
    this.Frame           = null;
    this.SequencesLength = 0;


    if( !Duedo.Utils.IsNull(bufferedImage) )
    {

        this.Source = bufferedImage;

        //Dimension of the whole spritesheet
        this._Width  = bufferedImage.naturalWidth;
        this._Height = bufferedImage.naturalHeight;


        //Initially show the entire spritesheet
        this.AddSequence("_default", [[0, 0, this._Width, this._Height]]);
        this.PlaySequence("_default");
    }
    else
    {
        this.Source = null;
    }
    
    
    this.Name = name || "spritesheet";


    return this;
};



/**
 * IsPlayingSequence
 * check if sequenceName is currently playing
 * @param {*} sequenceName 
 * @returns 
 */
Duedo.SpriteSheet.prototype.IsPlayingSequence = function(sequenceName) {
    if(this.ActiveSS().Name === sequenceName) {
        return true;
    }
    return false;
}



/*
 * AddSequence
 * @sequenceName: string "myanimation"
 * @framesData: [ [frameOriginX, frameOriginY, frameWidth, frameHeight], [...] ]
*/
Duedo.SpriteSheet.prototype.AddSequence = function ( sequenceName, framesData, options, sequenceImage = null ) {

    
    if(Duedo.Utils.IsNull(framesData))
    {
        framesData = [
            [0, 0, 0, 0]
        ];
    }

    // Convert width/height frame pixels to meters
    for(let i = 0; i < framesData.length; i++) {
        framesData[i][2] = framesData[i][2] / Duedo.Conf.PixelsInMeter;
        framesData[i][3] = framesData[i][3] / Duedo.Conf.PixelsInMeter;
    }

    var newSequence = new Duedo.SSequence(this.Game, sequenceName);

    //Compose sequence
    newSequence.Frames      = framesData.slice(0);
    newSequence.SpriteSource = sequenceImage ? sequenceImage : this.Source;
    newSequence.FrameIndex  = 0;
    newSequence.Name        = sequenceName;
    newSequence.Active      = true;
    newSequence.Parent      = this;
    newSequence.Rate        = options ? typeof options.Rate != undefined ? options.Rate : this.Rate : this.Rate;
    newSequence.Repeat      = options ? typeof options.Repeat != undefined ? options.Repeat : this.Repeat : this.Repeat;
    newSequence.Reverse     = false;

    this._Sequences[sequenceName] = newSequence;
    
    this.SequencesLength++;

    return newSequence;
};



/*
 * GetSequence
 * @public
 * Return a Duedo.SSequence
*/
Duedo.SpriteSheet.prototype.GetSequence = function(sname) {

    for(var i in this._Sequences)
    {
        if(this._Sequences[i].Name === sname)
            return this._Sequences[i];
    }

    return null;
};



/*
 * Load animations from .json
 * OriginX, OriginY, FrameWidth, FrameHeight
*/
Duedo.SpriteSheet.prototype.Load = function ( file ) {


    if (typeof file === "undefined")
    {
        return;
    }

    file = JSON.parse(file);

    /*Frames sequences*/
    if( typeof file["Animations"] !== "undefined" )
    {
        for( var index in file["Animations"] )
        {
            this.AddSequence(index, file["Animations"][index]);

            /*Just to show an initial frame*/
            if( !this.ActiveSequence || this.ActiveSequence === "_default" )
            {
                this.PlaySequence(index);
                this.PauseSequence(index);
            }
        }
    }


    /*Properties*/
    if ( typeof file["Properties"] !== "undefined" )
    {
        for ( var index in file["Properties"] )
        {
            if( typeof this[index] !== "undefined" )
            {
                if( index == "Source" )
                {
                    this[index] = this.Game.Cache.GetImage(file["Properties"][index]);
                    continue;
                }

                if( index === "Scale" )
                {
                    var p = file["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Vector2(p[0], p[1]);
                    continue;
                }
                this[index] = file["Properties"][index];
            }
        }
    }


    return this;

};



/**
 * ActiveSS
 * @returns the active sequence
 */
Duedo.SpriteSheet.prototype.ActiveSS = function () {
    return this._Sequences[ this.ActiveSequence ];
}



/*
 * PlaySequence
 * @sequenceName: the name of the sequence to start
 * @stopPreveSequence: (boolean) stop previous sequence, otherwise it will be paused
*/
Duedo.SpriteSheet.prototype.PlaySequence = function ( sequenceName, stopPrevSequence /*default: true*/) {

    if (stopPrevSequence === "undefined" || stopPrevSequence === true)
    {
        this.StopSequence(this.ActiveSequence);
    }
    
    if(sequenceName == this.ActiveSequence) {
        if(this.Paused) {
            return this.ResumeSequence();
        } else {
            return;
        }
    }

    this._Repeated = 0;

    this.ActiveSequence = sequenceName;
    
    this._ElapsedTime = 0;

    this.ActiveSS().Reset();

    if( typeof this.ActiveSS() === "undefined" )
    {
        throw "Duedo.SpriteSheet: undefined sequence '" + sequenceName + "'";
    }
    else
    {
        this.ActiveSS().Active = true;

        if(sequenceName !== "_default")
        {
            this.Playing = true;
        }
        
    }

    return this.ActiveSS();

};



/*
 * Update
 * @deltaT: game loop delta time
 * Main loop
*/
Duedo.SpriteSheet.prototype.Update = function ( deltaT ) {
    
    this.SuperUpdate(deltaT);

    if(!this.Source) 
        throw "Spritesheet: error - undefined buffered source";

    /*AutoDestroy*/
    if(this._Repeated >= this.ActiveSS().Repeat)
    {
        if(this.AutoDestroy)
        {
            //Call ssequence triggers
            this._CallTriggers("destroy");
            this.InUse = false; 
        }
        else 
        {
            this.StopSequence(this.ActiveSequence);
        }

        this.ActiveSS()._CallTriggers("repeatreached");
        return this;
    }


    if (this.ActiveSequence === null || !this.ActiveSS().Active || this.ActiveSequence === "_default")
    {
        return this; 
    }


    this._ElapsedTime += deltaT;


    if (this._ElapsedTime < this.ActiveSS().Rate)
    {
        return this;
    }
        

    this.ActiveSS().FrameIndex++;
        
    //Repeat cycle
    if (this.ActiveSS().FrameIndex > this.ActiveSS().Frames.length - 1 && this.ActiveSS().Active)
    {   
        this._Repeated++;
        this.ActiveSS().FrameIndex = 0;

        // Prevent "jumping effect" (was a bug)
        if(this._Repeated >= this.ActiveSS().Repeat) {
            this.ActiveSS().FrameIndex = this.ActiveSS().Frames.length - 1;
        }

        //Call ssequence trigger
        this.ActiveSS()._CallTriggers("repeated");
    }
    

    this._ElapsedTime = 0;

    return this;
};



/*
 * StopSequence
 * @sequenceName: the name of the sequence to stop
*/
Duedo.SpriteSheet.prototype.StopSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if ( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].FrameIndex = /*0*/ this._Sequences[sequenceName].Frames.length - 1;
        this._Sequences[sequenceName].Active     = false;
        this._Repeated                           = 0;
        this.Playing                             = false;
        this._ElapsedTime                        = 0;
    }


    return this;
};



/*
 * PauseSequence
 * @sequenceName: the name of the sequence to pause
*/
Duedo.SpriteSheet.prototype.PauseSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = false;
        this.Playing = false;
        this.Paused = true;
    }


    return this;
};



/*
 * ToggleSequence
 * @sequenceName: the name of the sequence to toggle
*/
Duedo.SpriteSheet.prototype.ToggleSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = this.Paused ? true : false;
        this.Playing = this.Paused ? true : false;
        this.Paused = this.Paused ? false : true;
    }

    return this;
};



/*
 * ResumeSequence
 * @sequenceName: the name of the sequence to pause
*/
Duedo.SpriteSheet.prototype.ResumeSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = true;
        this.Playing = true;
        this.Paused = false;
    }


    return this;
};



/*
 * FrameWidth | meters
 * @public
 * return current frame width
*/
Duedo.SpriteSheet.prototype.FrameWidth = function() {
    return (this.CurrentFrame()[2] * this.Scale.X);
};



/*
 * FrameHeight | meters
 * @public
 * return current frame height
*/
Duedo.SpriteSheet.prototype.FrameHeight = function() {
    return (this.CurrentFrame()[3] * this.Scale.Y);
};



/*
 * CurrentFrame
 * @public
 * Return current running frame
*/
Duedo.SpriteSheet.prototype.CurrentFrame = function() {
    var frame   = this.ActiveSS();
    return frame.Frames[frame.FrameIndex];
};



/*
 * PostUpdate
*/
Duedo.SpriteSheet.prototype.PostUpdate = function(deltaT) {

    if(this.Body) {
        var bpos = this.Body.GetPosition();
        this.Location.X = bpos.x;
        this.Location.Y = bpos.y;
        this.Rotation = this.Body.GetAngle();
    }


    /*Animations are Rate-independent*/
    this.UpdateAnimations(deltaT);

    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
                ? 
                    new Duedo.Vector2((this.Location.X - this.Width * this.Anchor.X), (this.Location.Y - this.Height * this.Anchor.Y)) 
                : 
                    new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            DToPixels(this.FrameWidth()),
            DToPixels(this.FrameHeight()))
    ) && this.Alpha > 0);
    
    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    
};



/*
 * Draw
 * @context: the context in use
 * draw the spritesheet on the screen
*/
Duedo.SpriteSheet.prototype.Draw = function ( context , location) {

    if (this.ActiveSequence === null || !this.Renderable || this.Alpha === 0 )
    {
        return this;
    }
       
    var frame;
    var scaledDim;
    var fc;
    var drawLoc = location !== undefined ? location : this.Location;

    /*Single frame origin*/
    fc = this.CurrentFrame();
    fc[0] = Math.max(1, fc[0]);
    fc[1] = Math.max(1, fc[1]);

    context.save();
    context.globalAlpha = this.Alpha * this.Game.World.Alpha;
    
    
    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 ) {
        
        var ScaledWidth  = this.FrameWidth();
        var ScaledHeight = this.FrameWidth();

        /*Get center based on PixelsInMeter and dimension*/
        var mLocation = this.Location.Clone()
            .MultiplyScalar(Duedo.Conf.PixelsInMeter)
            .Subtract(new Duedo.Vector2(this.HalfWidth, this.HalfHeight))
            .Add(
                new Duedo.Vector2((ScaledWidth * this.Anchor.X), (ScaledHeight * this.Anchor.Y))
            );
        
        context.translate(mLocation.X, mLocation.Y);
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(mLocation.X), -(mLocation.Y));
    }

    if(this.BlendMode)
        context.globalCompositeOperation = this.BlendMode;

    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    /*Draw*/
    try
    {
        context.drawImage(
            this.ActiveSS().SpriteSource,
            fc[0], fc[1],
            DToPixels(fc[2]), DToPixels(fc[3]),
            // Location
            DToPixels(drawLoc.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(drawLoc.Y) - DToPixels(this.Height * this.Anchor.Y),
            DToPixels(this.FrameWidth()), DToPixels(this.FrameHeight())
        ); 
                            
    }
    catch (error)
    {
        throw error;
    }

    if(this.Debug) {
        this._DrawDebug(context, drawLoc);
    }

    context.restore();
    
    return this;
};



/**
 * Draw debug information
 * @param {*} context 
 */
Duedo.SpriteSheet.prototype._DrawDebug = function(context, drawLoc) {
    // Draw wrapper
    context.beginPath();
    context.strokeStyle = 'red';
    context.rect(
        DToPixels(drawLoc.X) - DToPixels(this.Width * this.Anchor.X),
        DToPixels(drawLoc.Y) - DToPixels(this.Height * this.Anchor.Y), 
        DToPixels(this.FrameWidth()),
        DToPixels(this.FrameHeight())
    );
    context.stroke();
    // Draw center
    context.font = '12px arial';
    context.fillStyle = 'red';
    context.fillText(`Sprite X:${this.Location.X.toFixed(0)} Y:${this.Location.Y.toFixed(0)}`, 
        DToPixels(this.Location.X) - DToPixels(this.Width * 0.5), 
        DToPixels(this.Location.Y - 0.5) - DToPixels(this.Height * 0.5)
    );
    context.beginPath();
    context.moveTo(DToPixels(drawLoc.X), DToPixels(drawLoc.Y));
    context.lineTo(DToPixels(this.Location.X), DToPixels(this.Location.Y) - DToPixels(this.Height * 0.5));
    context.stroke();
    // Draw pivot
    context.beginPath();
    context.beginPath();
    context.arc(DToPixels(this.Location.X), DToPixels(this.Location.Y), 2, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = "yellow";
    context.fill();
}



/*
 * DrawGL
 * @context: the context in use
 * draw the spritesheet on the screen
*/
Duedo.SpriteSheet.prototype.DrawGL = function(context) {
}



/*
 * HalfWidth
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "HalfWidth", {

    get: function () {
        return (this.FrameWidth() / 2);
    }

});



/*
 * HalfHeight
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "HalfHeight", {

    get: function () {
        return (this.FrameHeight() / 2);
    }

});



/*
 * Height
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Height", {

    get: function () {
        return this.FrameHeight();
    }

});



/*
 * Width
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Width", {

    get: function () {
        return this.FrameWidth();
    }

});



/*
 * Center
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Center", {

    get: function () {
        return new Duedo.Vector2(this.Location.X + this.HalfWidth, this.Location.Y + this.HalfHeight);
    }

});



/*
 * IsPause
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "IsPaused", {

    get: function () {
        return this.Paused;
    }

});
/*
==============================
Duedo.Image
Author: http://www.edoardocasella.it

Notes:
Simple image
==============================
*/


Duedo.Image = function(gameContext, bufferedImage) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.IMAGE;
    this.CenterRelative = true;

	this._init(bufferedImage);
};


/*Inherit GraphicObject*/
Duedo.Image.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Image.prototype.constructor = Duedo.Image;


/*
 * _init
 * @private
*/
Duedo.Image.prototype._init = function(bufferedImage) {
	this._super();
    
	if(!Duedo.Utils.IsNull(bufferedImage))
	{
		this.Source = bufferedImage;
		this._Width  = this.Source.naturalWidth / Duedo.Conf.PixelsInMeter;
		this._Height = this.Source.naturalHeight / Duedo.Conf.PixelsInMeter;
	}

};



/*
 * PreUpdate
 * @public
*/
Duedo.Image.prototype.PreUpdate = function(deltaT) {
};



/*
 * Update
 * @public
*/
Duedo.Image.prototype.Update = function(deltaT) {
};



/*
 * PostUpdate
 * @public
*/
Duedo.Image.prototype.PostUpdate = function(deltaT) {

    if(this.Body) {
        var bpos = this.Body.GetPosition();
        this.Location.X = bpos.x;
        this.Location.Y = bpos.y;
        this.Rotation = this.Body.GetAngle();
    }

    //Update animations
    this.UpdateAnimations(deltaT);

    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
            ? 
                new Duedo.Vector2(this.Location.X - this.Width * this.Anchor.X, this.Location.Y - this.Height * this.Anchor.Y)
            : 
                new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }

};



/*
 * Width
 * @public
 * Width of this image
*/
Object.defineProperty(Duedo.Image.prototype, "Width", {
    get:function() {
        return this._Width * this.Scale.X;
    },
    set:function(val) {
        //this.Scale.X = val / this._Width;
        this._Width = val;
    }
});



/*
 * Height
 * @public
 * Height of this image
*/
Object.defineProperty(Duedo.Image.prototype, "Height", {
    get:function() {
        return this._Height * this.Scale.Y;
    },
    set:function(val) {
        //this.Scale.Y = val / this._Height;
        this._Height = val;
    }

});



/*
 * HalfWidth
 * @public
 * HalfWidth of this image
*/
Object.defineProperty(Duedo.Image.prototype, "HalfWidth", {
    get:function() {
        return this.Width / 2;
    }
});



/*
 * HalfHeight
 * @public
 * HalfHeight of this image
*/
Object.defineProperty(Duedo.Image.prototype, "HalfHeight", {
    get:function() {
        return this.Height / 2;
    }
});



/*
 * Draw
 * @public
*/
Duedo.Image.prototype.Draw = function(context) {

	if (!this.Renderable || this.Alpha === 0 || !this.Source )
    {
        return this; 
    }
    
	context.save();
    context.globalAlpha = this.Alpha * this.Game.World.Alpha;
 
    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 )
    {
        /*Get center based on PixelsInMeter and dimension*/
        var mLocation = this.Location.Clone()
            .MultiplyScalar(Duedo.Conf.PixelsInMeter)
            .Subtract(new Duedo.Vector2(this.HalfWidth, this.HalfHeight))
            .Add(
                new Duedo.Vector2((this.Width * this.Anchor.X), (this.Height * this.Anchor.Y))
            );
        
        context.translate(mLocation.X, mLocation.Y);
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(mLocation.X), -(mLocation.Y));
    }

    if(this.BlendMode)
        context.globalCompositeOperation = this.BlendMode;

    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    /*Draw*/
    context.drawImage(
        this.Source,    
        0, 0,   
        this.Source.width, this.Source.height,
        DToPixels(this.Location.X) - DToPixels(this.Width * this.Anchor.X),  
        DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y),
        DToPixels(this.Width), DToPixels(this.Height)
    );
    
    if(this.Debug) {
        // Draw wrapper
        context.beginPath();
        context.strokeStyle = 'green';
        context.fillStyle = 'black';
        context.rect(
            DToPixels(this.Location.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y), 
            DToPixels(this.Width),
            DToPixels(this.Height)
        );
        context.stroke();
        // Draw center
        context.beginPath();
        const centerSize = 1;
        context.rect(
            DToPixels(this.Location.X),
            DToPixels(this.Location.Y), centerSize, centerSize);
        context.fill();
        context.font = '12px arial';
        context.fillStyle = 'green';
        context.fillText(`Image X:${this.Location.X.toFixed(0)} Y:${this.Location.Y.toFixed(0)}`, 
            DToPixels(this.Location.X) - DToPixels(this.Width * 0.5), 
            DToPixels(this.Location.Y - 0.5) - DToPixels(this.Height * 0.5)
        );
    }

    context.restore();
    


    return this;

};



/*
==========================================
Duedo.Cache
Author: http://www.edoardocasella.it

Notes:
This is where all the buffered data is stored
==========================================
*/

Duedo.Cache = function(gameContext) {
	this.Game = gameContext || Duedo.Global.Games[0];

	this._Data = {
		_Sounds:  {},
		_Images:  {},
		_JSON:    {},
		_Txt:     {}
	};
	

	this.Total  = 0;

};


/*Constructor*/
Duedo.Cache.prototype.constructor = Duedo.Cache;


/*
 * AddSound
*/
Duedo.Cache.prototype.AddSound = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddSound: undefined sound " + name;
	}

	this._Data._Sounds[name] = bufferedData;

	this.Total++;

	return bufferedData;
};


/*
 * Get
 * Return a cached object
 * Slow. Better to use the specific function: like GetSound for sounds etc...
*/
Duedo.Cache.prototype.Get = function (name) {
	
	for (var i in this._Data)
		if (!Duedo.Utils.IsNull(this._Data[i][name]))
			return this._Data[i][name];

	return null;
};


/*
 * GetSound
*/
Duedo.Cache.prototype.GetSound = function( name ) {

	return this._Data._Sounds[name];

};


/*
 * RemoveSound
*/
Duedo.Cache.prototype.RemoveSound = function( name ) {

	delete this._Data._Sounds[name];
	this.Total--;
};


/*
 * AddImage
*/
Duedo.Cache.prototype.AddImage = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddImage: undefined image " + name;
	}

	this._Data._Images[name] = bufferedData;

	this.Total++;

	return bufferedData;

};



/*
 * GetImage
*/
Duedo.Cache.prototype.GetImage = function( name ) {

	return this._Data._Images[name];

};


/*
 * RemoveImage
*/
Duedo.Cache.prototype.RemoveImage = function( name ) {

	delete this._Data._Images[name];
	this.Total--;
};


/*
 * AddJSON
*/
Duedo.Cache.prototype.AddJSON = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddJSON: undefined JSONData " + name;
	}

	this._Data._JSON[name] = bufferedData;

	this.Total++;

	return bufferedData;

};



/*
 * GetJSON
*/
Duedo.Cache.prototype.GetJSON = function( name ) {
	try {
		return JSON.parse(this._Data._JSON[name]);
	} catch(e) {
		return this._Data._JSON[name];
	}
};



/*
 * RemoveJSON
*/
Duedo.Cache.prototype.RemoveJSON = function( name ) {

	delete this._Data._JSON[name];
	this.Total--;
};


/*
 * AddTxt
*/
Duedo.Cache.prototype.AddTxt = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddTxt: undefined txt " + name;
	}

	this._Data._Txt[name] = bufferedData;

	this.Total++;

	return bufferedData;

};


/*
 * GetTxt
*/
Duedo.Cache.prototype.GetTxt = function( name ) {
	
	return this._Data._Txt[name];

};



/*
 * RemoveTxt
*/
Duedo.Cache.prototype.RemoveTxt = function( name ) {

	delete this._Data._Txt[name];
	this.Total--;
};


/**
 * StartsWith
 * get all documents that starts with: startsWith: string
 */
Duedo.Cache.prototype.StartsWith = function(startsWith, type) {

	switch (type) {
		case 'image':
			type = '_Images';
		break;
		case 'json':
			type = '_JSON';
		break;
		case 'txt':
			type = '_Txt';
		break;
		case 'sound':
			type = '_Sounds';
		break;
	}

	const output = [];

	Object.keys(this._Data[type]).forEach(key => {
		if(key.startsWith(startsWith)) {
			output.push(this._Data[type][key]);
		}
	})

	return output;

}



/*
 * Destroy
 * Destroy all the cache contents
*/
Duedo.Cache.prototype.Destroy = function() {

	for (var i in this._Data._Sounds)
	{
		delete this._Data._Sounds[i];
	}

	for (var i in this._Data._Images)
	{
		delete this._Data._Images[i];
	}

	for (var i in this._Data._JSON)
	{
		delete this._Data._JSON[i];
	}

	for (var i in this._Data._Txt)
	{
		delete this._Data._Txt[i];
	}


	this.Total = 0;

};
/*
==========================================
Duedo.Loader
Author: http://www.edoardocasella.it

Notes:
Resources preloader

Loader bindable events
- progress
- error
- complete
- startloading

==========================================
*/


Duedo._LoadingInstance = function () {
    
    this._Resources = {
        Path: null,
        Name: null,
        Complete: null
    };
    
    this.Percentage = 0;

    /*@private*/
    this._Total = 0;
    this._Loaded = 0;
    this._OnComplete;
    this._OnProgress;
    this._OnStart;
};


Duedo._LoadingInstance.prototype = Object.create(Duedo.Object.prototype);
Duedo._LoadingInstance.prototype.constructor = Duedo._LoadingInstance;




Duedo.Loader = function ( GameContext, Cache ) {
    Duedo.Object.call(this);
    this.GameContext = GameContext || Duedo.Global.Games[0];
    
    /*Game cache reference*/
    this._Cache = Cache || undefined;

    /*Stores resources to be loaded*/
    this.Resources = new Array();
    
    /*Loaded percentage*/
    this.Percentage = 0;

    /*Resources amount*/
    this.Total = 0;
    
    /*Have been loaded?*/
    this.Loaded = 0;
    
    this.HasLoaded = false;

    this.Loading = false;

    this.AudioContext;
    this._UsingWebAudio = false;

    /*Loadable extensions*/
    this.AudioMimeTypes;
    this.ImageMimeTypes;
    this.TextMimeTypes;

    /*Store errors*/
    this.Errors = [];

    /*Timing properties*/
    this.StartTime = null;
    this.EndTime = null;
    this.TimeRequired = null;

    this.Queued = [];


    this._setup();
};




/*Inherit object*/
Duedo.Loader.prototype = Object.create(Duedo.Object.prototype);
Duedo.Loader.prototype.constructor = Duedo.Loader;


/*
 * Setup
 * @private
 */
Duedo.Loader.prototype._setup = function () {

    var WebAudioAPI = Duedo.Utils.Can.WebAudio();

    if(WebAudioAPI)
    {
        this.AudioContext = new window[WebAudioAPI]();
        this._UsingWebAudio = true;
    }

    /*Loadable extensions*/
    this.AudioMimeTypes = ["mp3", "ogg", "wav", "mp4", "webm"];
    this.ImageMimeTypes = ["png", "jpg", "bmp"];
    this.TextMimeTypes  = ["txt", "json"];

   
};








/*
 * AddResource
 * @public
 */
Duedo.Loader.prototype.AddResource = function ( _path, slugName, /*callback*/ _complete) {

    if (Duedo.Utils.IsNull(_path)) return;

    //Multiple files
    if( _path.indexOf("|") != -1 )
    {
        var resPaths = _path.split("|");

        for( var i in resPaths )
        {
            this.AddResource(resPaths[i], slugName, _complete);
        }

        return;
    }



    var name = slugName ? slugName : _path.substring(_path.lastIndexOf("/") + 1, _path.lastIndexOf("."));


    if( this.Queued.indexOf(name) !== -1 )
    {
        return;
    }


    //Check browser compatibility
    var ext = _path.split('.').pop();

    if( this.AudioMimeTypes.indexOf(ext) !== -1 )
    {
        var MIME = Duedo.Utils.GetMimeType(ext);

        if( !Duedo.Utils.Can.PlayType(MIME) ) 
        {
            console.warn("Duedo.AddResource: this browser currently does not support " + ext + " codec for the audio resource -> " + _path);
            return;
        }
    }



    this.Resources.push({
        path: _path || undefined,
        name: name,
        complete: _complete || undefined
    });
    

    this.Queued.push(name);



    this.Total++;
    
};










/*
 * Add resources
 * @public
 */
Duedo.Loader.prototype.AddResources = function ( array ) {
    
    if (!(array instanceof Array))
    {
        return this;
    }
        

    for (var i in array)
    {
        this.AddResource(array[i].path, array[i].complete);
    }


    return this;
};









/*
 * Start loading
 * @public
 */
Duedo.Loader.prototype.StartLoading = function () {

    

    /*If nothing to load*/
    if(!this.Resources.length)
        return this._LoadingCompleted();

    
    var ext, src;

    this.HasLoaded = false;

    for ( var i in this.Resources )
    {
        src = this.Resources[i];

        if(typeof src.path === "undefined") {
            continue;
        }
        
        ext = src.path.split('.').pop();
        
        this._LoadResource(src.path, src.name, src.complete, ext);      
    }   


    this.Loading = true;

    this.StartTime = this.GameContext.ElapsedTime;


    this._CallTriggers("startloading");

    return this;
};












/*
 * Start loading
 * @private
 */
Duedo.Loader.prototype._LoadResource = function ( source, name, onLoad, ftype ) {

    var scope = this;

    switch (ftype) 
    {


        case "mp3":
        case "wav":
        case "ogg":
        case "mp4":
        case "webm":

            if (this._UsingWebAudio === true)
            {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', source, true);
                xhr.send();
                xhr.responseType = "arraybuffer";

                /*Audio resource has been loaded*/
                xhr.onload = function (e) {

                    scope.AudioContext.decodeAudioData(
                        xhr.response,
                        function OnDecodeSuccess(buffer) {

                            if (!buffer) {
                                alert('Duedo.Loader._LoadAudioResourceXML: Error decoding file data: ' + source + " - restart");
                                return;
                            }

                            scope._ResourceLoaded(buffer, name, ftype, onLoad);

                        }
                    );

                }

                /*On error listener*/
                xhr.onerror = function (e) {
                    scope.Errors.push(source);
                    scope._CallTriggers("error");
                }
            }
            else
            {
                /*AudioTag*/
                var sound;

                sound = new Audio();

                sound.addEventListener('canplaythrough', function () {
                    scope._ResourceLoaded(this, name, ftype, onLoad);
                });

                sound.addEventListener('error', function () {
                    scope.Errors.push(source);
                    scope._CallTriggers("error");
                });


                sound.src = source;
            }
            break;



        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
            var image;

            image = new Image();

            image.onload = function () {
                scope._ResourceLoaded(this, name, ftype, onLoad);
            };

            image.onerror = function () {
                scope.Errors.push(source);
                scope._CallTriggers("error");
            };

            image.crossOrigin = this.crossOrigin;

            image.src = source;
            break;



        case "txt":
            var xhr = new XMLHttpRequest();
            xhr.open('GET', source, true);
            xhr.send();
            xhr.responseType = "text";

            /*Txt resource has been loaded*/
            xhr.onreadystatechange = function ()
            {
                if(xhr.readyState === 4)
                {
                    if(xhr.status === 200 || xhr.status == 0)
                    {
                        scope._ResourceLoaded(xhr.responseText, name, ftype, onLoad);
                    }
                }
            }

            /*On error listener*/
            xhr.onerror = function (e) {
                scope.Errors.push(source);
                scope._CallTriggers("error");
            }

            break;


        case "json":
            var xhr = new XMLHttpRequest();
            /*
                IIS WebConfig remainder
                  <system.webServer>
                    <staticContent>
                      <mimeMap fileExtension=".json" mimeType="application/json" />
                    </staticContent>
                  </system.webServer>
            */
            xhr.open('GET', source, true);
            xhr.responseType = "text";
            xhr.onload = function () {
                scope._ResourceLoaded(this.responseText, name, ftype, onLoad);
            }
            xhr.send();
            break;
    }


};







/*
 * ResourceLoaded
 * @private
 */
Duedo.Loader.prototype._ResourceLoaded = function (source, name, type, onLoad) {

    switch (type) {

        case "mp3":
        case "wav":
        case "ogg":
        case "mp4":
        case "webm":
            this._Cache.AddSound(source, this._GetNameAsProperty(name));
            break;

        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
            this._Cache.AddImage(source, this._GetNameAsProperty(name));
            break;

        case "txt":
            this._Cache.AddTxt(source, this._GetNameAsProperty(name)); 
            break;

        case "json":
            this._Cache.AddJSON(source, this._GetNameAsProperty(name));
        break;

        default:
            return null;
    }

    
    this.Loaded++;

    if (!Duedo.Utils.IsNull(onLoad)) {
        onLoad(source);
    }


    this.Percentage = (this.Loaded * 100) / this.Total;


    this._CallTriggers("progress");

    if (this.Percentage === 100) 
    {
        return this._LoadingCompleted();
    }



    return;
};







/*
 * LoadingCompleted
 * @private
 */
Duedo.Loader.prototype._LoadingCompleted = function () {
    
    this.Loading = false;
    this.HasLoaded = true;
    this.Queued = [];
    this.Resources = [];

    /*Loading time*/
    this.EndTime = this.GameContext.ElapsedTime;
    this.TimeRequired = (this.EndTime - this.StartTime);


    this._CallTriggers("complete");

};





/*
 * StopLoading
 * @public
 */
Duedo.Loader.prototype.StopLoading = function() {

};





/*
 * GetNameAsProperty
 * @private
 */
Duedo.Loader.prototype._GetNameAsProperty = function (_name) {
    //ADD: se la prima lettera è un numero elimina
    return _name.replace(/\s+/g, " ").replace(/-/g, '_');
};



/*
 * Duedo.SpeechCommand
*/
Duedo.SpeechCommand = function ( text, operation ) {
    
    /*Data*/
    this.Text = text || null;
    this.Operation = operation || null;

    /*Private*/
    this._Called = false;
    this._CommandPhrase;
    this.DestroyAfterExecute = false;

};




/*
 * Duedo.SpeechRecognition
 * BETA - Uses Google speech recognition API
 * Bind vocal triggers
*/
Duedo.SpeechRecognition = function ( autostart ) {
    Duedo.Object.call(this);


    this.SpeechAPI;
    this.Recognizer;

    this.Started = false;
    this._Autostart = autostart || false;
    this.AutoRestart = true;
    /*Conf*/
    this.Async = false;

    this._ActivationKey = null;

    this._Initialized = false;

    /*Commands*/
    this.Commands;


    this._init();

};



/*Inherit object*/
Duedo.SpeechRecognition.prototype = Object.create(Duedo.Object.prototype);
Duedo.SpeechRecognition.prototype.constructor = Duedo.SpeechRecognition;


/*
Triggerable
- start
- stop
*/




/*
 * _init
 * @private
*/
Duedo.SpeechRecognition.prototype._init = function () {

    /*Check compatibility*/
    this.SpeechAPI = window.SpeechRecognition       ||
                     window.webkitSpeechRecognition ||
                     window.mozSpeechRecognition    ||
                     window.msSpeechRecognition     ||
                     window.oSpeechRecognition;


    if( !this.SpeechAPI )
    {
        return false;
    }
    else
    {

        this.Commands = [];
        this._ActivationKey = null;

        /*Setup recognition system*/
        this.Recognizer = new this.SpeechAPI();

        /*Initial configuration*/
        this.Recognizer.maxAlternatives = 1;
        this.Recognizer.continuous      = true;
        this.Recognizer.lang            = "it-IT";
        this.Recognizer.interimResults  = false;


        var self = this;


        /*Onstart*/
        this.Recognizer.onstart = function (ev) {

        };


        /*Onend*/
        this.Recognizer.onend = function () {

            self.Listening = false;

            if( self.AutoRestart )
            {
                self.Start(); 
            }

        };


        /*Onresult*/
        this.Recognizer.onresult = function (revent) {
            self._DispatchResults( revent );
        };


        /*Onerror*/
        this.Recognizer.onerror = function (event) {
            switch( event.error ) {
                case "network":
                    break;
                case "service-not-allowed":
                    break;
                case "not-allowed":
                    break;
            }
        };


        this._Initialized = true;

        if(this._Autostart)
            this.Start();

        return this;
    }

};





/*
 * Start
 * @public
 * Start recognizer
*/
Duedo.SpeechRecognition.prototype.Start = function () {

    if( !this._Initialized )
    {
        this._init();
    }

    if (!this.Listening)
    {
        this.Recognizer.start();
        this.Listening = true;
        this._CallTriggers("start");
    }
        
};




/*
 * _DispatchResults
 * @public
*/
Duedo.SpeechRecognition.prototype._DispatchResults = function ( rev ) {
    
    var results, text;

    results = rev.results[rev.resultIndex];

    for( var i = 0; i <= results.length; i++ )
    {

        if(Duedo.Utils.IsNull(results[i]))
        {
            continue;
        }

        text = results[i].transcript.trim();

        for( var i in this.Commands )
        {
            var cmd = this.Commands[i];
            
            if( text.indexOf(cmd.Text) !== -1 )
            {
                if (this.Async)
                {
                    cmd.Operation();
                    if(cmd.DestroyAfterExecute)
                        this.RemoveCommand(cmd.Text);
                }
                else
                {
                    /*Will be executed in the next update loop*/
                    cmd._Called = true;
                }
                
            }

        }
        

    }
};





/*
 * Stop
 * @public
*/
Duedo.SpeechRecognition.prototype.Stop = function () {
    this.Recognizer.stop();
    this.Listening = false;
    this._CallTriggers("stop");
};






/*
 * AddCommand
 * TWODSC: {Text: null, Operation: null}
 * @public
*/
Duedo.SpeechRecognition.prototype.AddCommand = function ( text, operation ) {

    var Command = new Duedo.SpeechCommand();

    Command.Text = text;
    
    Command.Operation = operation;

    this.Commands.push(Command);


    return Command;

};






/*
 * RemoveCommand
 * @public
*/
Duedo.SpeechRecognition.prototype.RemoveCommand = function ( command ) {

    var i = this.Commands.length;
    
    while(i--)
    {
        if( this.Commands[i].Text === command )
        {
            this.Commands.splice(i, 1);
        }
    }


    return this;

};






/*
 * CommandToRegExt
 * @private
*/
Duedo.SpeechRecognition.prototype._CommandToRegExt = function ( command ) {

    // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
    var optionalParam = /\s*\((.*?)\)\s*/g;
    var optionalRegex = /(\(\?:[^)]+\))\?/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;

    command = command.replace(escapeRegExp, '\\$&')
                     .replace(optionalParam, '(?:$1)?')
                     .replace(namedParam, function (match, optional) {
                          return optional ? match : '([^\\s]+)';
                      })
                      .replace(splatParam, '(.*?)')
                      .replace(optionalRegex, '\\s*$1?\\s*');



    return new RegExp('^' + command + '$', 'i');

};





/*
 * Main update
 * @public
*/
Duedo.SpeechRecognition.prototype.Update = function () {
    

    /*Check activation key*/
    if( this._ActivationKey && !this.AutoRestart )
    {
        
        if( Duedo.Global.Game.Input.KeyState(this._ActivationKey) )
        {
            if( this.Listening )
            {
                //return;
            }
            else
            {
                this.Start();
            }
        }
        else
        {
            if( this.Listening )
            {
                this.Stop();
            }
        }
    }


    /*Execute called commands*/
    if( !this.Async )
    {
        for (var i = this.Commands.length - 1; i >= 0; i--)
        {
            if( this.Commands[i]._Called )
            {
                this.Commands[i].Operation();
                this.Commands[i]._Called = false;
                
                if(this.Commands[i].DestroyAfterExecute)
                    this.RemoveCommand(this.Commands[i].Text);
            }
        }
    }

};





/*
 * SetActivationKey
 * @public
 * 
*/
Object.defineProperty(Duedo.SpeechRecognition.prototype, "ActivationKey", {

    get: function () {
        return this._ActivationKey;
    },

    set: function ( value ) {
        return this._ActivationKey = value;
    }

});





/*
 * Autostart
 * @public
 * 
*/
Object.defineProperty(Duedo.SpeechRecognition.prototype, "Autostart", {

    get: function () {
        return this._Autostart;
    },

    set: function ( val ) {
        this._Autostart = val;
        this.Start(); 
    }

})
/*
==============================
Duedo.Sound
==============================
*/


Duedo.Sound = function ( source, name, volume, soundManager, connect ) {
    Duedo.Object.call(this);
    this.Type = Duedo.SOUND;
    
    this._SoundManager;
    this._AudioContext;
    this._UsingWebAudio = false;
    this._UsingAudioTag = false;
    this._MasterGainNode;
    this._GainNode;

    this._Source;
    this._BufferSource;

    this.Name; // Internal reference name
    this.OriginalName; // Original name of audiofile
    this.Location;
    this.PlaybackRate = 1;
    this._IsPlaying = false;

    this.Volume = 1;

    this._TotalDuration;
    this._TotalDurationMS;
    this._StartTime;

    this.ElapsedTime = 0;

    this.Paused = false;
    this._PausePosition = 0;
    this._PausedTime;

    this.DynamicSound = false;
    this.MaxDistance = 800;

    this.Repeat = 0;
    this._Repeated = 0;

    //Triggers
    this.Complete;
    this.Progress;
    this.End;

    this.RemoveAfterPlayback = true;

    this._setup( source, name, volume, soundManager, connect );
};



Duedo.Sound.prototype = Object.create(Duedo.Object.prototype);
Duedo.Sound.prototype.constructor = Duedo.Sound;


/*
Sound bindable events:
- ended
- volume
- stop
- pause
- resume
- play
*/



/*
 * _setup
*/
Duedo.Sound.prototype._setup = function ( source, name, volume, soundManager, connect ) {
    
    if(typeof source === "undefined" || typeof soundManager === "undefined")
    {
        throw "Duedo.Sound._setup: undefined source or parent Duedo.SoundManager";
    }
    

    if(1)
    {

        this._Source       = source;
        this.Name          = name;
        this._SoundManager = soundManager;


        if( soundManager._UsingWebAudio )
        {
            this._UsingWebAudio = true;

            //Setup new Sound object
            
            this._AudioContext        = this._SoundManager._AudioContext;
            this._MasterGainNode      = this._AudioContext._MasterGain;


            if (typeof this._AudioContext.createGain === 'undefined')
            {
                this._GainNode = this._AudioContext.createGainNode();
            }
            else
            {
                //Chrome
                this._GainNode = this._AudioContext.createGain();
            }

            this.Volume = (typeof volume === "undefined" ? 1 : volume);

            this._GainNode.gain.value = this.Volume * soundManager.Volume;

            if ( connect )
            {
                this._GainNode.connect(this._AudioContext.destination);
            }


        }
        else
        {
            if( soundManager._UsingAudioTag )
            {
                this._UsingAudioTag = true;

                if (typeof this._Source.duration === "undefined")
                {
                    this.TotalDuration = this._Source.duration;
                }
            }
        }
        
    }
    


    return this;

};







/*
 * SetLocation
 * Sets a spatial position to the sound,
 * its volume will vary according to the distance of the viewport
 * public
*/
Duedo.Sound.prototype.SetLocation = function ( x, y ) {

    if( x instanceof Duedo.Vector2 )
    {
        this.Location = x;
    }
    else
    {
        this.Location = new Duedo.Vector2(x, y);
    }
    
    this.DynamicSound = true;

    //[!] Now this.volume is AUTO
    //Depending on the distance from the viewport centre

    return this;
};






/*
 * SetMaxDistance
 * (when sound has a specific location in space)
*/
Duedo.Sound.prototype.SetMaxDistance = function (n) {
    this.MaxDistance = n;
    return this;
};






/*
 * Update
 * TODO: Don't update if sound is dynamic and too much distant from viewport
*/
Duedo.Sound.prototype.Update = function (deltaT) {
    

    if( this._IsPlaying )
    {

        this.ElapsedTime += deltaT;

        if (this.ElapsedTime >= this._TotalDuration)
        {
            if( this._Repeated < this.Repeat )
            {
                this.Stop().Play();
                this._Repeated++;
            }
            else
            {

                if (this.RemoveAfterPlayback)
                {
                    this._SoundManager.RemoveSound(this, true);
                }
                else
                {
                    this.Stop();
                }

            }
            
            this._CallTriggers("ended");
            return;
        }
        
        /*Sound volume based on distance*/
        if( this.DynamicSound === true )
        {
            
            var distanceFromViewportCenter = this.Location.Clone().Subtract(this._SoundManager.GameContext.Viewport.Center).Magnitude();
            // If you don't hear the audio, try setting a higher value for MaxDistance
            if( distanceFromViewportCenter > 0 )
            {
                this.SetVolume( (Math.max(0, 1 - (1 / this.MaxDistance) * distanceFromViewportCenter)) );
            }
            else 
            {
                this.SetVolume( 1 );
            }

        }
    }
    

};







/*
 * SetVolume
*/
Duedo.Sound.prototype.SetVolume = function ( volumeValue ) {

    if (volumeValue > 1)
    {
        volumeValue = 1;
    }

    if( volumeValue < 0 )
    {
        volumeValue = 0;
    }

    this.Volume = (volumeValue * this._SoundManager.Volume);

    if( this._UsingWebAudio )
    {
        this._GainNode.gain.value = this.Volume;
    }
    else
    {
        this._Source.volume = this.Volume;
    }
    
    this._CallTriggers("volume");



    return this;
};









/*
 * Stop
*/
Duedo.Sound.prototype.Stop = function () {

    if (!this._IsPlaying || !this._Source)
    {
        return;
    }
    

    if (this._UsingWebAudio)
    {

        if ( typeof this._Source.noteOff === "function" )
        {
            this._BufferSource.noteOff(0); 
        }
        else
        {
            this._BufferSource.stop(0);
        }

        this._PausedTime = this.ElapsedTime;

    }
    else if (this._UsingAudioTag)
    {
        this._Source.pause();
        /*Audio tag use source.currentTime...*/
        this._PausedTime = this._Source.currentTime;
        this._Source.currentTime = 0;
    }


    this._IsPlaying = false;
    
    
    this._CallTriggers("stop");



    return this;

};










/*
 * Pause
*/
Duedo.Sound.prototype.Pause = function () {

    if( this._IsPlaying )
    {
        this.Stop();
        this._IsPlaying = false;
        this.Paused = true;

        this._CallTriggers("pause");
    }



    return this;
};








/*
 * Resume
*/
Duedo.Sound.prototype.Resume = function () {

    if( this.Paused && !this._IsPlaying )
    {
        this.Play( this._PausedTime );
        this.Paused = false;
        this._CallTriggers("resume");
    }


    return this;
};







/*
 * Loop
*/
Duedo.Sound.prototype.Loop = function (loop) {
    if(!loop) loop = Infinity;
    this.Repeat = Math.floor(loop);
    return this;
};







/*
 * Play
 * If startFrom is !== null we are calling a resume operation
 * If startFrom == -1 audio will start from a random point
*/
Duedo.Sound.prototype.Play = function ( startFrom ) {

    if( this._IsPlaying === true )
    {
        return this;
    }

    startFrom = (Duedo.Utils.IsNull(startFrom) ? 0 : startFrom);


    if( this._UsingWebAudio )
    {

        this._BufferSource        = this._AudioContext.createBufferSource();
        this._BufferSource.buffer = this._Source;

        this._BufferSource.connect( this._GainNode );

        this.PlaybackRate = parseFloat(this.PlaybackRate);

        if (isFinite(this.PlaybackRate)) {
            this._BufferSource.playbackRate.value = this.PlaybackRate;
        }

        //Total duration
        this._TotalDuration = this._BufferSource.buffer.duration;

        if(startFrom == -1) {
            startFrom = Math.random() * (this._TotalDuration - 0 + 1) + 0;
        }

        if ( typeof this._BufferSource.noteGrainOn != "undefined" )
        {
            this._BufferSource.noteGrainOn(0, /*sec-start*/startFrom, /*sec-end*/ this._TotalDuration);
            this.ElapsedTime = startFrom;
        }
        else
        {
            this._BufferSource.start(0, startFrom, this._TotalDuration);
            this.ElapsedTime = startFrom;
        }
    }
    else
    {
        this._TotalDuration = this._Source.duration;

        if(startFrom == -1) {
            startFrom = Math.random() * (this._TotalDuration - 0 + 1) + 0;
        }

        this._Source.currentTime = startFrom;
        this._Source.play();
    }


    this._IsPlaying = true;
    
    //micro
    this._StartTime = this._SoundManager.GameContext.ElapsedTime;

    if( this._Repeated === 0 )
    {
        this._Repeated = 1;
    }

    this._CallTriggers("play");


    return this;

};


/*
 * Playing
*/
Object.defineProperty(Duedo.Sound.prototype, "Playing", {
    get: function () {
        return this._IsPlaying;
    },
});
/*
==============================
Duedo.SoundManager

NOTE:
Chrome's policy
https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
According to the new Chrome policy, the audio context is activated only after a user click.

==============================
*/


Duedo.SoundManager = function ( _gameContext ) {
    Duedo.Object.call(this);

    this.GameContext = _gameContext || Duedo.Global.Games[0];

    this._AudioContext;
    this._MasterGain;
    this._noAudio = true;

    this._Volume = 1;

    this._SoundChannels = {};
    this._MaxChannels = 32;

    this._Sounds = [];

    https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    this._PendingUserInteraction = false;

    this._UsingWebAudio = false;
    this._UsingAudioTag = false;
    this._AudioAPIs = ["AudioContext", "webkitAudioContext", "Audio"];

    this._setup();

};


/*Inherit oject*/
Duedo.SoundManager.prototype = Object.create(Duedo.Object.prototype);
Duedo.SoundManager.prototype.constructor = Duedo.SoundManager;



/*
 * _setup
*/
Duedo.SoundManager.prototype._setup = function () {

    //Choice AudioAPIs
    for( var i in this._AudioAPIs )
    {
        if( !!window[this._AudioAPIs[i]] )
        {
            
            if (this._AudioAPIs[i] !== "Audio")
            {
                this._AudioContext = new window[this._AudioAPIs[i]]();
                this._UsingWebAudio = true;
            }
            else
            {
                this._UsingAudioTag = true;
            }

            this._noAudio = false;

            break;
        }
    }



    if( typeof this._AudioContext === "undefined" )
    {
        return;
    }


    //Create master gain
    if (typeof this._AudioContext.createGain === 'undefined')
    {
        this._MasterGain = this._AudioContext.createGainNode();
    }
    else
    {
        this._MasterGain = this._AudioContext.createGain();
    }

    this._MasterGain.gain.value = this.Volume;

    this._MasterGain.connect(this._AudioContext.destination);

    https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    document.documentElement.addEventListener(
        "click", () => {
            if (this._AudioContext.state !== 'running') {
                this._AudioContext.resume();
            }
        });

    return;
};






/*
 * Update
*/
Duedo.SoundManager.prototype.Update = function (deltaT) {
    
    if(this._noAudio)
    {
        return;
    }
    
    for (var index = this._Sounds.length - 1; index >= 0; index--)
    {
        this._Sounds[index].Update(deltaT);
    }
    
};







/*
 * _AddSound
 * private
*/
Duedo.SoundManager.prototype._AddSound = function ( _bufferedSound, nameReference, volume ) {

    var DUEDOSound;

    //Instantiate a new sound
    DUEDOSound = new Duedo.Sound( _bufferedSound, nameReference, volume, this, true );

    this._Sounds.push(DUEDOSound);


    return DUEDOSound;
    
};






/*
 * Play
 * Set volume, location, rate, or choose whether to play the audio from a random point
 * options { Location: Vec2, Volume: integer, Rate: integer, NameReference: string, RandomStart: boolean}
 * When RandomStart == true playback will start from a random position
*/
Duedo.SoundManager.prototype.Play = function ( soundName, options ) {
    
    this._AudioContext.resume();

    if(this._noAudio)
    {
        return;
    }

    const playOptions = {
        Location: null,
        Volume: 1,
        Rate: 1,
        NameReference: null,
        RandomStart: null
    }

    Object.assign(playOptions, options);

    DUEDOSound = this.NewSoundInstance(soundName, playOptions.NameReference);
    if(Duedo.Utils.IsNull(DUEDOSound))
        return;

    if (playOptions.Location)
    {
        DUEDOSound.SetLocation( location );
    }

    DUEDOSound.SetVolume(playOptions.Volume);

    DUEDOSound.PlaybackRate = playOptions.Rate;

    DUEDOSound.Play( playOptions.RandomStart ? -1 : 0);

    if (this._AudioContext.state !== 'running') {
        this._PendingUserInteraction;
    }

    return DUEDOSound;
    
};







/*
 * NewSoundInstance
*/
Duedo.SoundManager.prototype.NewSoundInstance = function ( soundName, nameReference ) {

    var s = this.GameContext.Cache.GetSound(soundName);

    if (Duedo.Utils.IsNull(s))
    {
        console.warn("Duedo.SoundManager.Play: unrecognized sound '" + soundName + "'");
    }
    else
    {
        var DUEDOSound = this._AddSound(s, (nameReference !== undefined ? nameReference : ("TWODSound_" + this._Sounds.length)), this.Volume);
        
        DUEDOSound.OriginalName = soundName;
        
        if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            DUEDOSound.ParentState = this.GameContext.StateManager.CurrentState();

        return DUEDOSound;
    }


    return null;
    
};







/*
 * StopSound
*/
Duedo.SoundManager.prototype.StopSound = function ( soundNameReference ) {
    
    var s = this.GetSoundByReferenceName(soundNameReference);
    
    if(!s)
    {
        return null;
    }

    this.RemoveSound(s, true /*stop*/);

    return this;
};






/*
 * StopAllSounds
*/
Duedo.SoundManager.prototype.StopAllSounds = function () {
    
    for( var i in this._Sounds )
    {
        if ( this._Sounds[i] )
        {
            if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            {
                if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                    this._Sounds[i].Stop();
            }
            else
            {
                this._Sounds[i].Stop();
            }
        }
    }



    return this;
};






/*
 * PauseSound
*/
Duedo.SoundManager.prototype.PauseSound = function (soundNameReference) {

    var s = this.GetSoundByReferenceName(soundNameReference);

    if(!s)
    {
        return null;
    }

    s.Pause();

    return this;
};


Duedo.SoundManager.prototype.IsPlaying = function(name) {
    const sound = this.GetListedSoundByName(name);
    if(!sound) {
        return false;
    } else {
        return sound.Playing;
    }
} 


/*
 * PauseAllSounds
*/
Duedo.SoundManager.prototype.PauseAllSounds = function () {

    for (var i in this._Sounds)
    {
        if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
        {
            if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                this._Sounds[i].Pause();
        }
        else
        {
            this._Sounds[i].Pause();
        }
    }



    return this;
};






/*
 * ResumeSound
*/
Duedo.SoundManager.prototype.ResumeSound = function (soundNameReference) {

    var s = this.GetSoundByReferenceName(soundNameReference);
    if(!s)
    {
        return null;
    }

    s.Resume();

    return this;

};






/*
 * ResumeAllSounds
*/
Duedo.SoundManager.prototype.ResumeAllSounds = function () {

    for (var i in this._Sounds)
    {
        if (this._Sounds[i])
        {
            if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            {
                if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                    this._Sounds[i].Resume();
            }
            else
            {
                this._Sounds[i].Resume();
            }
        }
    }



    return this;
};



/*
 * GetSoundByReferenceName
*/
Duedo.SoundManager.prototype.GetListedSoundByName = function ( soundNameReference ) {

    if( typeof soundNameReference === "undefined" )
    {
        return null;
    }

    for (var i in this._Sounds)
    {
        if (this._Sounds[i].OriginalName === soundNameReference)
        {
            return this._Sounds[i];
        }
    }

    return null;
};



/*
 * GetSoundByReferenceName
*/
Duedo.SoundManager.prototype.GetSoundByReferenceName = function ( soundNameReference ) {

    if( typeof soundNameReference === "undefined" )
    {
        return null;
    }

    for (var i in this._Sounds)
    {
        if (this._Sounds[i].Name === soundNameReference || this._Sounds[i].OriginalName === soundNameReference)
        {
            return this._Sounds[i];
        }
    }

    return null;
};

//Abbreviated version
Duedo.SoundManager.prototype.Sound = function ( nameReference ) {
    return this.GetSoundByReferenceName( nameReference );
};








/*
 * RemoveSound
*/
Duedo.SoundManager.prototype.RemoveSound = function ( reference, stop ) {
    
    if( typeof reference === "undefined" )
    {
        return false;
    }


    stop = (typeof stop === "undefined" ? true : stop);


    if( reference instanceof Object )
    {
        var index = this._Sounds.indexOf( reference );
        
        if( index !== -1 )
        {
            if ( this._Sounds[index]._IsPlaying && stop )
            {
                this._Sounds[index].Stop();
            }

            return this._Sounds.splice( index, 1);
        }
    }
    else if ( typeof reference === "string" )
    {
        var TWODSound = this.GetSoundByReferenceName(reference);

        if ( TWODSound !== null )
        {
            return this.RemoveSound(TWODSound);
        }

    }



    console.warn("Duedo.SoundManager.RemoveSound: trying to remove a not identified sound");

};





/*
 * SetVolume
 *
 * global volume
*/
Duedo.SoundManager.prototype.SetVolume = function ( volumeValue ) {

    if (volumeValue > 1)
    {
        volumeValue = 1;
    }

    if (volumeValue < 0)
    {
        volumeValue = 0;
    }

    this._Volume = volumeValue;



    if( this._UsingWebAudio )
    {
        this._MasterGain.gain.Volume = volumeValue;
    }


    for (var i in this._Sounds)
    {
        this._Sounds[i].SetVolume(volumeValue);
    }



    return this;
};



/*
 * _BufferedAudioResources
*/
Object.defineProperty(Duedo.SoundManager.prototype, "_BufferedAudioResources", {

    get: function () {

        return _BufferedAudioResources;

    },

    set: function (bufferedList) {

        return _BufferedAudioResources = bufferedList;

    }

});




/*
 * Volume
*/
Object.defineProperty(Duedo.SoundManager.prototype, "Volume", {

    get: function() {
        return this._Volume;
    },

    set:function(value) {
        this.SetVolume(value);
    }

});
/*
==============================
Duedo.Tile
Author: http://www.edoardocasella.it
==============================
*/



Duedo.Tile = function(game, x, y, layer, width, height, image, body, label) {
	Duedo.GraphicObject.call(this);
	this.Game = game || typeof undefined;
	/*Tile parent layer*/
	this.Layer;
	this.Graphical;
	this._init(x, y, layer, width, height, image, body, label);
};


/*Inherit GraphicObject*/
Duedo.Tile.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tile.prototype.constructor = Duedo.Tile;



/*
 * _init
 * @private
*/
Duedo.Tile.prototype._init = function(x, y, layer, width, height, image, body_options, label) {
	this._super();

	if(image)
		this.Graphical = new Duedo.Image(this.Game, image);
	else throw "Duedo.Tile: needs a buffered image";

	this.Width  = width  || 0;
	this.Height = height || 0;

	this.Location.X = x || 0;
	this.Location.Y = y || 0;

	this.Layer = layer || 0;

	this.Graphical.Location.X = this.Layer.Location.X + x;
	this.Graphical.Location.Y = this.Layer.Location.Y + y;
	this.Graphical.Width  = width;
	this.Graphical.Height = height;
	
	/*Is physic*/
	if(body_options) {
		this._UseBody(body_options, label);
	}

	//**PERCHÈ???
	this.Graphical.Scale.SetBoth(1);
};


/*
 * UseBody
 * private
*/
Duedo.Tile.prototype._UseBody = function(body_options, label) {

	/*Start location*/
	var _tmp = this.Location.Add(this.Layer.Location).Clone();
	var loc = new Duedo.Vector2(
		_tmp.X + this.Graphical.HalfWidth,
		_tmp.Y + this.Graphical.HalfHeight
	);

	/*Create rect body*/
	this.Graphical.Body = new Duedo.Body(
		this.Game, 
		this.Graphical, 
		this.Game.PhysicsEngine.RectangleBody(loc, this.Width, this.Height, body_options),
		label
	);

	/*Add body*/
	this.Game.PhysicsEngine.AddBody(this.Graphical.Body);
	
	return this;
};


/*
 * PreUpdate
*/
Duedo.Tile.prototype.PreUpdate = function(dt) {};

/*
 * Update
*/
Duedo.Tile.prototype.Update = function(dt) {};

/*
 * PostUpdate
*/
Duedo.Tile.prototype.PostUpdate = function(dt) {
	this.Graphical.PostUpdate(dt);
};

/*
 * ContainsPoint
*/
Duedo.Tile.prototype.ContainsPoint = function(x, y) {

	 return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

};

/*
==============================
Duedo.TilemapLayer
Author: http://www.edoardocasella.it
==============================
*/
Duedo.TilemapLayer = function(game, map, image) {

	this.Game = game || Duedo.Global.Games[0];
	this.Map = map || typeof undefined;
	this.Image = image;
	this.Z = 0;
	this.Location = new Duedo.Vector2(0, 0);
	this.Tiles = [];
	this.Renderable = true;

	this.Alpha = 1;
	this.Width = null;
	this.Height = null;
};


/*
 * FormatLayer
 * @public
*/
Duedo.TilemapLayer.prototype.FormatLayer = function(data) {

	for(var i in data) 
	{
		var t = data[i]; //single tile
		
		/*Is solid?*/
		if(!t[3]) 
			t[3] = false;

		var label = "generic";
		if(typeof t[4] != "undefined" && t[4] != null)
			label = t[4];

		var width = this.Map.TileWidth;
		var height = this.Map.TileHeight;


		this.Tiles.push(new Duedo.Tile(this.Game, t[0], t[1], this, width, height, t[2], t[3], label));
	}

	this.ComputeWidth().ComputeHeight();
};


/*
 * ComputeWidth
*/
Duedo.TilemapLayer.prototype.ComputeWidth = function() {
	
	var max = 0;

	for(var i in this.Tiles)
	{
		/*TODO*/
		if(this.Tiles[i].Location.X + this.Tiles[i].Width > max) {
			max = this.Tiles[i].Location.X + this.Tiles[i].Width;
		}
	}

	this.Width = max;

	return this;
};

/*
 * ComputeHeight
*/
Duedo.TilemapLayer.prototype.ComputeHeight = function() {

	var max = 0;

	for(var i in this.Tiles)
	{
		/*TODO*/
		if(this.Tiles[i].Location.Y + this.Tiles[i].Height > max) {
			max = ((this.Location.Y - this.Tiles[i].Location.Y) + this.Tiles[i].Height);
		}
	}

	this.Height = max;

	return this;
};


/*
 * PreUpdate
 * @public
*/
Duedo.TilemapLayer.prototype.PreUpdate = function(dt) {};


/*
 * Update
 * @public
*/
Duedo.TilemapLayer.prototype.Update = function(dt) {};


/*
 * PostUpdate
 * @public
*/
Duedo.TilemapLayer.prototype.PostUpdate = function(dt) {

	for(var i in this.Tiles) {
		this.Tiles[i].PostUpdate(dt);
	}

	//Is layer visible
	this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            this.Location.Clone(),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);
this.Renderable = true;
};


/*
 * Draw
 * @public
*/
Duedo.TilemapLayer.prototype.Draw = function(ctx) {
	
	if(!this.Renderable) return;

	ctx.save();
	for(var i in this.Tiles) 
	{
		var l = this.Tiles[i];

		if(l instanceof Duedo.Tile) 
		{		
			l.Graphical.Draw(ctx);
		}
	}

	ctx.restore();

};
/*
==============================
Duedo.Tilemap
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Tilemap = function(game, image, tilewidth, tileheight) {
	Duedo.GraphicObject.call(this);
    this.Game = game || Duedo.Global.Games[0];
    this.Image = null;
	this.Layers = [];
	this.InUse = true;

	/*Single tile dimension*/
	this.TileWidth;
	this.TileHeigh;
	
	this.DefaultTileWidth = 50;
	this.DefaultTileHeight = 50;

	this._init(image, tilewidth, tileheight);

};


/*Inherit GraphicObject*/
Duedo.Tilemap.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tilemap.prototype.constructor = Duedo.Tilemap;


/*
 * _init
*/
Duedo.Tilemap.prototype._init = function(i, tilewidth, tileheight) {

	/*Se deve essere generata da una immagine*/
	if(i instanceof Image)
	{
		this.Image = i;
	}

	/*Tile dimension*/
	this.TileWidth  = tilewidth   || this.DefaultTileWidth;
	this.TileHeight = tileheight  || this.DefaultTileHeight;

	return this;

};



/*
 * Update processes
*/
Duedo.Tilemap.prototype.PreUpdate = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].PreUpdate(dt);
	}
};
Duedo.Tilemap.prototype.Update = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].Update(dt);
	}
};
Duedo.Tilemap.prototype.PostUpdate = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].PostUpdate(dt);
	}
};


/*
 * CreateLayer
 * create a layer by specifing an array
*/
Duedo.Tilemap.prototype.CreateLayer = function(data, x, y, z) {

	//New layer
	var layer = new Duedo.TilemapLayer(this.Game, this, this.Image);
	
	//Layer plane
	layer.Z = z || 0;
	layer.Location.X = x;
	layer.Location.Y = y;
	layer.FormatLayer(data);

	this.Layers.push(layer);

};


/*
 * JoinGame
*/
Duedo.Tilemap.prototype.JoinGame = function() {
 	this.Game.Add(this);
};



Duedo.Tilemap.prototype.Draw = function(ctx) {
	for(var i in this.Layers) {
		this.Layers[i].Draw(ctx);
	}
};
/*
==============================
Duedo.State ( TEMPLATE )
Author: http://www.edoardocasella.it
==============================
*/

Duedo.State = function () {

};


/*
 * Constructor
*/
Duedo.State.prototype.constructor = Duedo.State;



/*
 * Data
 * @overwritten
 * To store state's relative data: accessible as this.StateData from every state's methods
*/
Duedo.State.prototype.Data = {};



/*
 * Load
 * @overwritten
*/
Duedo.State.prototype.Load = function () {
};



/*
 * LoadUpdate
 * @overwritten
*/
Duedo.State.prototype.LoadUpdate = function() {
};


/*
 * Create
 * @overwritten
*/
Duedo.State.prototype.Create = function () {
};



/*
 * Update
 * @overwritten
*/
Duedo.State.prototype.Update = function () {
};

/*
 * Paused
 * @overwritten
*/
Duedo.State.prototype.PausedUpdate = function () {
};



/*
 * Render
 * @private
*/
Duedo.State.prototype.Render = function (_2dcontext) {
};

/*
 * Exit
 * @overwritten
*/
Duedo.State.prototype.Exit = function () {
};



/*
 * Zoom
 * @overwritten
*/
Duedo.State.prototype.Zoom = function () {
};



/*
 * Enter
 * @overwritten
*/
Duedo.State.prototype.Enter = function () {
};



/*
 * Shutdown
 * @overwritten
*/
Duedo.State.prototype.Destroy = function () {
};



/*
 * Pause
 * @overwritten
*/
Duedo.State.prototype.Pause = function() {
};



/*
 * Resume
 * @overwritten
*/
Duedo.State.prototype.Resume = function() {	
};

/*
==============================
Duedo.StateManager
Author: http://www.edoardocasella.it

Prepared while studying the Phaser.js code, thanks to Richard Davey
==============================
*/

Duedo.StateManager = function ( gameContext ) {
    
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Loader;
    this.SoundM;
    this.Events;

    /*States stack*/
    this._States;
    this._StatesLength;
    this._CurrentState = null;
    this._ForthcomingState;

    this._STDStateMethods;
    this._CreatedStates = {};

    /*Delay*/
    this._DelayStateChange = null;
    this._DelayStartTime;
    this._Ready = false;
    this._init();
};




/*
 * _init
 * @private
*/
Duedo.StateManager.prototype._init = function () {
    
    /*States stack*/
    this._States = {};
    this._StatesLength = 0;
    this._CurrentState = null;
    this._ForthcomingState = null;
    this._StateLoading = false;

    /*Quick references to game managers*/
    this.Loader   = this.Game.Loader;
    this.SoundM   = this.Game.SoundManager;
    this.Events   = this.Game.Events;
    this.Viewport = this.Game.Viewport;
    this.Input    = this.Game.InputManager;
    
    /*STD State template*/
    this._STDStateMethods = {
        "Data"        : {}, // Object to store the state's relative data
        "Load"        : null,
        "LoadUpdate"  : null,
        "Added"       : null,
        "Zoom"        : null, // When camera has been zoomed @param - zoomLevel
        "Update"      : null, // Each frame @param - deltaT
        "Create"      : null,
        "Enter"       : null,
        "Exit"        : null,
        "PausedUpdate": null,
        "Pause"       : null,
        "Resumed"     : null,
        "Destroy"     : null,
        "Render"      : null
    }


    return this;

};



/*
 * RemoveState
 * @public
*/
Duedo.StateManager.prototype.RemoveState = function ( stateName ) {
    

    if( this._States[stateName] )
    {

        if( stateName === this._CurrentState )
        {
            this.FreeFromState();
        }

        delete this._States[stateName];
        
        this._StatesLength--;
    }

};



/*
 * CurrentState
 * return: _currentState
*/
Duedo.StateManager.prototype.CurrentState = function() {
    return this._CurrentState;
};



/*
 * AddState
 * @public
*/
Duedo.StateManager.prototype.AddState = function( stateName, DUEDOState, start ) {

    DUEDOState.Game = this.Game;
    
    if( Duedo.Utils.IsNull(start) )
    {
        start = false;
    }


    if( Duedo.Utils.IsNull(stateName) )
    {
        stateName = "state_" + this._StatesLength;
    }

    /*Add state*/
    this._States[stateName] = DUEDOState;


    /*Increment StatesLength*/
    this._StatesLength++;


    /*Check autostart*/
    if( start )
    {
        if( this.Game.Running )
        {
            this.StartState( stateName );
        }
        else
        {
            this._ForthcomingState = stateName;
        }
    }
    
    return DUEDOState;

};



/*
 * DelayStateChange
 * Delay next state enter
*/
Duedo.StateManager.prototype.DelayStateChange = function( time ) {
    this._DelayStateChange = time;
};



/*
 * StartState
 * @public
*/
Duedo.StateManager.prototype.StartState = function( stateName ) {

    if( this._States[stateName] )
    {
        this._ForthcomingState = stateName;
    }

};



/*
 * SwitchState
 * @private
*/
Duedo.StateManager.prototype.ActivateState = function ( stateName ) {

    //Link methods
    for( var i in this._STDStateMethods )
    {
        if(!Duedo.Utils.IsNull(this._States[stateName][i]))
        {
            this[i] = this._States[stateName][i];
        }
    }
            
    /*Set _CurrentState*/
    this._CurrentState  = stateName;
    this._Ready = false;
};



/*
 * PreUpdate
 * @public
 * Manages the transitions between states
*/
Duedo.StateManager.prototype.PreUpdate = function(deltaT) {

    if(this._StateLoading)
    {
        this._UpdateLoading();
    }
    else
    {
        if(this._ForthcomingState)
        {
            /*if delay state change*/
            if(!Duedo.Utils.IsNull(this._DelayStateChange))
            {   
                if(!this._DelayStartTime)
                    this._DelayStartTime = this.Game.ElapsedTime;

                if(this.Game.ElapsedTime <= (this._DelayStartTime + this._DelayStateChange))
                {
                    return;
                }
                else
                {
                    this._DelayStateChange = null;
                    this._DelayStartTime   = null;
                }
            }

            if(this._ForthcomingState === this._CurrentState)
                return this._ForthcomingState = null;

            /*Exit from current state*/
            if(this._CurrentState !== null)
            {
                if(!Duedo.Utils.IsNull(this["Exit"]))
                    this.Exit.call(this._States[this._CurrentState]);

                this.FreeFromState();
            }

            /*Activate forthcoming state*/
            this.ActivateState(this._ForthcomingState);


            /*Preload or start state*/
            if(!Duedo.Utils.IsNull(this["Load"]) && !this._CreatedStates[this._ForthcomingState])
            {
                this.Load.call(this._States[this._CurrentState]);
                this.Game.Loader.StartLoading();
                this._StateLoading = this._ForthcomingState; 
            }
            else
            {
                this._LoadCompleted();
                this._EnterState();
            }

            this._ForthcomingState = null;

        } else {
            // Check messages
            if(this.Game._ReadMessage('zoomed')) {
                Object.keys(this._States).forEach(stateKey => {
                    const state = this._States[stateKey];
                    if(!Duedo.Utils.IsNull(state['Zoom'])) {
                        state.Zoom.call(this._States[this._CurrentState], this.Game.Viewport.Zoom);
                    }
                });
            }
        }
    }


    return this;
};



/*
 * UpdateLoading
 * @private
*/
Duedo.StateManager.prototype._UpdateLoading = function() {

    if(!Duedo.Utils.IsNull(this["LoadUpdate"]))
    {
        this.LoadUpdate.call(this._States[this._CurrentState], this.Game.DeltaT);
    }

    if(!this.Game.Loader.Loading)
    {
        this._LoadCompleted();
        this._EnterState();
    }
};



/*
 * _LoadCompleted
 * @private
 * It is called when a state is loaded
*/
Duedo.StateManager.prototype._LoadCompleted = function() {

    if( !this._Ready && !Duedo.Utils.IsNull(this["Create"]) && !this._CreatedStates[this._StateLoading])
    {
        this._Ready = true;
        this["Create"].call(this._States[this._CurrentState]);
    }
    else
    {
        this._Ready = true;
    }

    this._CreatedStates[this._StateLoading] = true;
    this._StateLoading = false;

    return this;

};



/*
 * _EnterState
 * @private
*/
Duedo.StateManager.prototype._EnterState = function() {

    if( !Duedo.Utils.IsNull(this["Enter"]) )
    {
        this["Enter"].call(this._States[this._CurrentState]);
    }

}



/*
 * UpdateState
 * Calls the custom update function for the current state
 * @public
*/
Duedo.StateManager.prototype.UpdateState = function() {

    if( !Duedo.Utils.IsNull(this["Update"]) && this._Ready)
    {
        this["Update"].call(this._States[this._CurrentState], this.Game.DeltaT);
    }


};



/*
 * RenderState
 * Render some additional things from the current state
 * [!]Will be rendered last
*/
Duedo.StateManager.prototype.RenderState = function (ctx) {

    if (!Duedo.Utils.IsNull(this["Render"]) && this._Ready) {
        this["Render"].call(this._States[this._CurrentState], ctx);
    }

};



/*
 * FreeFromState
*/
Duedo.StateManager.prototype.FreeFromState = function() {

    /*Destroy state methods*/
    for ( var i in this._STDStateMethods )
    {
        this[i] = null;
    }

};



/*
 * Destroy
*/
Duedo.StateManager.prototype.Destroy = function() {
    
    this.FreeFromState();

    this._States = {};
    this._StatesLength = 0;
    this._ForthcomingState = null;
    this._CurrentState = null;
    this._CreatedStates = {};

};



/*
 * Add/AddEntity
 * Register entity to his relative state
 * !Called once per state in "Create"
*/
Duedo.StateManager.prototype.Add = function( DUEDOObject ) { 
    return this.AddEntity(DUEDOObject); 
};
Duedo.StateManager.prototype.AddEntity = function( DUEDOObject ) {

    if( !DUEDOObject || typeof DUEDOObject === "undefined" )
    {
        return null;
    }
        
    this.Game.Add(DUEDOObject);
    
    return DUEDOObject;
};

/*
==============================
Duedo.EventsManager
Author: http://www.edoardocasella.it


WHAT DOES IT DO?
- Add a time-based event to the running game (like a sound or an animation or a generic function every 'n' time ---> 'n' can be a function too that returns a numeric value: ex myRandFunc())
- Add a "DoFor" event using mygame.Events.DoFor(myObject, "Color", "red", 1) <- the property will be modified for 1 second and the will return as the original


EVENT BINDABLE TRIGGERS:
- expired
==============================
*/
Duedo.Events = function(game) {
	Duedo.Object.call(this);
	this.Game = game || Duedo.Global.Games[0];
	this._DoForEvents;
	this._Cache;
	this._init();
};



/*Inherit object*/
Duedo.Events.prototype = Object.create(Duedo.Object.prototype);
Duedo.Events.prototype.constructor = Duedo.Events;

/*
 * _init
*/
Duedo.Events.prototype._init = function() {
    this._DoForEvents = [];
    this._Cache = [];
};



/*
 * Update
 * Main update loop
*/
Duedo.Events.prototype.Update = function( deltaT ) {

	for(var i = this.ChildrenList.List.length -1; i >= 0; i--)
	{

		var Event = this.ChildrenList.List[i];

		if(Duedo.Utils.IsNull(this.Game.StateManager.CurrentState()) || Event.ParentState !== this.Game.StateManager.CurrentState())
		{
			continue;
		}

		Event.ElapsedTime += deltaT;


		var CallTime = (typeof Event.Time === "function" ? Event.RepeatEvery : Event.Time);

		if(Event.ElapsedTime >= CallTime)
		{
			Event.ElapsedTime = 0;

			if(Event.RepeatEvery)
			{
				if(typeof Event.Time !== "function")
				{
					Event.Time = Event.RepeatEvery;
				}
				else
				{
					Event.RepeatEvery = Event.Time.call(this);
				}
			}

			if(!Duedo.Utils.IsNull(Event.Function))
			{
				Event.Function.call(this);
			}

			Event.Repeated++;

			if(Event.Expired())
			{
				/*Call related triggers*/
				Event._CallTriggers("expired");

				/*Remove the event*/
				this.ChildrenList.List.splice(i, 1);
				continue;
			}
		}
	}



	if (this._DoForEvents.length)
	    this._UpdateDoForEvents(deltaT);


};



/*
 * _UpdateDoForEvents
 * @private
 * Update all the _DoFor events
*/
Duedo.Events.prototype._UpdateDoForEvents = function (deltaT) {


    for (var i = this._DoForEvents.length - 1; i >= 0; i--)
    {
        var e = this._DoForEvents[i];

        e._ElapsedTime += deltaT;

        if(e._ElapsedTime >= e.Duration)
        {

            if (Duedo.IsFunc(e.Object))
                e.Object.call(this);
            else
            {
                e.Object[e.Prop] = e._OrigVal;

                //OnEnd callback
                if (!Duedo.Utils.IsNull(e.OnEnd))
                    e.OnEnd.call(e.Object);
            }

            this._DoForEvents.splice(i, 1);
        }
    }


};



/*
 * AddEvent
 * @name: name of the event
 * @func: function to call
 * @repeat: number of times this function will be called
 * @time: represent a time interval (among how many milliseconds does the action start?),
 	 this can be a custom function too that returns a value (ex. return Duedo.Utils.RandInRange(0, 60))
 * Used for: an event that occurs repeatedly or every a random time (ex, a distant explosion sound... or a ship that flies every 2 minutes...)
*/
Duedo.Events.prototype.AddEvent = function(name, func, repeat, time) {

	/*New time base event*/
	var Event = new Duedo.Event(this);

	Event.Name         = name   || "event" + this.ChildrenList.List.length;
	Event.Function     = func   || null;

	Event.Repeat       = repeat || 1;
	Event.Time         = time   || 0;

	if(Event.Repeat > 1)
	{
		if(typeof Event.Time === "function")
		{
			/*Were using a personalized function*/
			var CallTime = Event.Time.call(this);

			if(Duedo.Utils.IsNull(CallTime))
			{
				throw "Duedo.Events: your event function must return a value";
			}

			Event.RepeatEvery = Event.Time.call(this);
		}
		else
		{
			Event.RepeatEvery = Event.Time;
		}
	}

	Event.ParentState  = this.Game.StateManager.CurrentState();

	this.ChildrenList.List.push(Event);


	return Event;

};



/*
 * DoFor/DoBetween
 * @public
 * Modify a property for a limited time, then returns to the old value
 * @FIX: What happens if it is called several times with the same values?
 * ----- We can use the 'onend' callback to set a boolean on the affected object
 * Can be used with DoBetween too with those params:
 * @obj = function to call
 * @prop = how soon
 */
Duedo.Events.prototype.DoBetween = function (func, time) {
    return this.DoFor(func, time); //ex. mygame.Events.DoBetween(my_func, 0.5 seconds);
};

Duedo.Events.prototype.DoFor = function (obj, prop, val, time, onend) {

    var tEvent = false;

    if (!isNaN(prop)) {
        time = prop;
        tEvent = true;
    }

    /*DFE object*/
    var dfe = {
        Object: obj,
        Val: val,
        Duration: time,
        Prop: prop,
        OnEnd: onend,
        _OrigVal: obj[prop],
        _StartTime: this.Game.ElapsedTime,
        _ElapsedTime: 0
    };

    if (!tEvent)
        obj[prop] = val;

    /*Add the event to the stack*/
    this._DoForEvents.push(dfe);


    /*Return an event reference*/
    return dfe;
};



/*
 * RemoveDoForEvent
 * @public
 * Remove a DoFor or DoBetween event
 * @param: a dfe object reference (look at DoFor method)
*/
Duedo.Events.prototype.RemoveDoForEvent = function (dfe) {

    var index = this._DoForEvents.indexOf(dfe);
    if (index !== -1)
        return this._DoForEvents.splice(index, 1);

    return null;
};



/*
 * RemoveEvent
*/
Duedo.Events.prototype.RemoveEvent = function(name) {

	if(Duedo.Utils.IsNull(name))
	{
		return null;
	}

	if(name instanceof Object)
	{
		for(var i in this.ChildrenList.List)
		{
			if(this.ChildrenList.List[i] === name)
			{
				this.RemoveEvent(this.ChildrenList.List[i]);
				break;
			}
		}
	}
	else
	{
		for(var i in this.ChildrenList.List)
		{
			if(this.ChildrenList.List[i].Name === name)
			{
				return this.ChildrenList.List.splice(i, 1);
			}
		}
	}

};



/*
 * GetEvent
*/
Duedo.Events.prototype.GetEvent = function( name ) {

	for( var i in this.ChildrenList.List )
	{
		if(this.ChildrenList.List[i].Name === name)
		{
			return this.ChildrenList.List[i];
		}
	}

};










/*
==============================
Duedo.Event
==============================
*/
Duedo.Event = function(EventsManager) {
	Duedo.Object.call(this);
	this.Type = Duedo.EVENT;

	this.Parent = EventsManager || null;

	this.Name;
	this.Time;
	this.ElapsedTime;
	this.StartTime;
	this.Function;
	this.Repeat;
	this.Repeated;
	this.ParentState;

	this._init();
};


/*Inherit object*/
Duedo.Event.prototype = Object.create(Duedo.Object.prototype);
Duedo.Event.prototype.constructor = Duedo.Event;

/*
 * _init
*/
Duedo.Event.prototype._init = function() {

	this.Name        = "event" + this.Parent.Children.length;
	this.Time        = 0;
	this.StartTime   = this.Parent.Game.ElapsedTime;
	this.Function    = null;
	this.Repeat      = 1;
	this.Repeated    = 0;
	this.ElapsedTime = 0;


	return this;
};


/*
 * Repeat
*/
Duedo.Event.prototype.Repeat = function(times) {
	this.Repeat = times;
	return this;
};


/*
 * Expired
*/
Duedo.Event.prototype.Expired = function() {
	return (this.Repeated >= this.Repeat);
};

/*
==============================
Duedo.Stage
Updates all the game entities
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Stage = function (gameContext) {
    Duedo.Object.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
};

/*Inherit generic Object*/
Duedo.Stage.prototype = Object.create(Duedo.Object.prototype);
Duedo.Stage.prototype.constructor = Duedo.Stage;


/*
 * Update levels
 * Called by the main loop
*/
Duedo.Stage.prototype.PreUpdate = function (dt) {
    this.__Update(dt, this.Game.Entities, "PreUpdate");
};
Duedo.Stage.prototype.Update = function (dt) {
    this.__Update(dt, this.Game.Entities, "Update");
};
Duedo.Stage.prototype.PostUpdate = function (dt) {
    this.__Update(dt, this.Game.Entities, "PostUpdate", true);
};


/*
 * IsGraphical
*/
Duedo.Stage.prototype.IsGraphical = function(o) {
    return (typeof o["Draw"] !== "undefined");
};


/*
 * __Update
 * @private
*/
Duedo.Stage.prototype.__Update = function (deltaT, ents, upLevel, considerRendering = false) {

    /*Update entities*/
    var len = ents.length - 1;
    
    /*Cycle through all entities*/
    while ((ent = ents[len--]) != null) {
        
        if (ent["NeedsUpdate"] && ent["NeedsUpdate"] == false) {
            continue;
        }

        /*Check entity life*/
        if (!Duedo.Null(ent["InUse"])) 
        {
            
            if (ent.MustBeDead(this.Game)) 
            {
                ent.InUse = false;
                
                if(ent instanceof Duedo.Entity) 
                {
                    ent.Kill();
                }
            }

            /*Entity is dead*/
            if (!ent.InUse) 
            {
                if (!Duedo.Null(ent["_CallTriggers"])) 
                {
                    ent._CallTriggers("destroy");
                }

                this.Game.Entities.splice(ents.indexOf(ent), 1);
                continue;
            }


            if(this.IsGraphical(ent) && ent.ShouldBeRendered && considerRendering)
            {
                this.Game.Renderer.Buffer.push(ent);
            }

        } //#ENT-INUSE
        
        /*Step entity*/
        this.__StepEntity(deltaT, ent, upLevel);
        /*Save previous updated entity*/
        Duedo.Global.PreviousEntity = ent;
    }
};


/*
 * __StepEntity
 * Update an individual entity and all his sub-children
*/
Duedo.Stage.prototype.__StepEntity = function (deltaT, ent, upLevel) {

    if (Duedo.Null(upLevel)) upLevel = "Update";

    /*Update entity*/
    if (!Duedo.Null(ent[upLevel])) 
    {

        /*SuperUpdate*/
        if (!Duedo.Null(ent["Super" + upLevel])) 
        {
            ent["Super" + upLevel](deltaT);
        }

        /*Update*/
        ent[upLevel](deltaT);

        /*Update sub-children*/
        if (Duedo.IsArray(ent.ChildrenList.List)) 
        {
            this.__Update(deltaT, ent.ChildrenList.List, upLevel);
        }
    }

};

/*
==========================================
Duedo.InputManager
Author: http://www.edoardocasella.it

Notes:
Manage keyboard and mouse input
==========================================
*/

Duedo.InputManager = function(gameContext) {
    this.Game = gameContext || Duedo.Global.Games[0];

    this.Enabled;

    /*Keyboard*/
    this.Keyboard;

    /*Mouse*/
    this.Mouse;
    this.RecordMouseHistory = false;
    this.HistoryPushRate = 0.5;
    this.HistoryRecordLimit = 10;

    //Mouse graphic pointer: cursor {@image}
    this.MouseGPointer = null;
    this.MouseGPointerDim = new Duedo.Dimension(20, 20);

    //InteractivityManager
    this.InteractivityManager;

    this._init();
};



/*
 * _init
 * @private
 * Boot input manager listeners
*/
Duedo.InputManager.prototype._init = function() {

    if(Duedo.Utils.IsNull(this.Game))
    {
        throw "Duedo.InputManager._init: missing game context";
    }

    this.Enabled = true;

    //Keyboard handler
    this.Keyboard = new Duedo.Keyboard(this.Game);
    //Mouse handler
    this.Mouse = new Duedo.Mouse(this.Game, this);
    /*Interactivity manager*/
    this.InteractivityManager = new Duedo.InteractivityManager(this.Game);

};



/*
 * Update
 * @public
 * Update handler
*/
Duedo.InputManager.prototype.Update = function(deltaT) {

    if(!this.Enabled)
        return;

    /*Update keyboard*/
    this.Keyboard.Update(deltaT);
    /*Update mouse*/
    this.Mouse.Update(deltaT);
    /*Update user interactions*/
    this.InteractivityManager.Update(deltaT);

};



/*
 * PostUpdate
 * @public
 * PostUpdate handler
*/
Duedo.InputManager.prototype.PostUpdate = function (deltaT) {
    this.Mouse.PostUpdate(deltaT);
    this.InteractivityManager.PostUpdate(deltaT);
};



/*
 * DisconnectAll
 * @public
 * Disconnect all input handlers
*/
Duedo.InputManager.prototype.DisconnectAll = function() {
    this.Keyboard.Disconnect();
    this.Mouse.Disconnect();
};



/*
 * BindKey
 * @public
 * Bind an event to a key
 * @param e: event (onkeyp, onkeydown)
 * @param k: Duedo keycode (see Duedo.Keyboard.js)
 * @param c: function event
 * #TODO
*/
Duedo.InputManager.prototype.BindKey = function (e, k, c) {
    //this.Keyboard.BindKey(e, k, c);
};

/*
==========================================
Duedo.Keyboard
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager by Richard Davey

Notes:
Keyboard input handler
==========================================
*/


Duedo.Keyboard = function(gameContext) {
    this.Game = gameContext || Duedo.Global.Games[0];

	this.Enabled;
	this.PreventDefault;

	//this._Captures;
	this._Keys;
    //-UNUSED
	this.Events;

	this.Latency = 0.03;

	this._init();

};


//Constructor
Duedo.Keyboard.prototype.constructor = Duedo.Keyboard;


//Events
Duedo.Keyboard.prototype._KeyDownEvent;
Duedo.Keyboard.prototype._KeyUpEvent;



/*
 * _init
*/
Duedo.Keyboard.prototype._init = function() {

	if(!this.Game)
		return -1;

	//this._Captures = [];
	this._Keys     = [];
	this.Events   = [];

	this.Connect();

};



/*
 * Connect
 * @public
 * Start keyboard listener
*/
Duedo.Keyboard.prototype.Connect = function() {

	/*K events*/
	var self = this;

	this._KeyDownEvent = function(event) {
		self._ProcessKeyDown(event);
	};

	this._KeyUpEvent = function(event) {
		self._ProcessKeyUp(event);
	};


	//Enable keyboard handler
	this.Enabled = true;
	this.PreventDefault = false;

	/*Start listeners*/
	window.addEventListener('keydown', this._KeyDownEvent, false);
    window.addEventListener('keyup', this._KeyUpEvent, false);

};



/*
 * _ProcessKeyDown
 * @private
*/
Duedo.Keyboard.prototype._ProcessKeyDown = function(event) {
	

	this.Event = event;

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);


	var key = event.keyCode || event.which;

	if (!this._Keys[key])
    {
       this._Keys[key] = new Duedo.Key(this.Game, key, this);
    }


    this._Keys[key].ProcessKeyDown();

};



/*
 * _ProcessKeyUp
 * @private
*/
Duedo.Keyboard.prototype._ProcessKeyUp = function(event) {

	this.Event = event;

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	var key = event.keyCode || event.which;

	if (!this._Keys[key])
    {
       this._Keys[key] = new Duedo.Key(this.Game, key, this);
    }

    
    this._Keys[key].ProcessKeyUp(event);
};



/*
 * _PreventDefault
 * @private
*/
Duedo.Keyboard.prototype._PreventDefault = function(event) {

	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;

};


/*
@todo
Duedo.Keyboard.prototype.BindKey = function (e, k, c, n) {
    
    if(Duedo.Utils.IsNull(this.Events[k]))
    {
        this.Events[k] = new Array();
    }

    if (Duedo.Utils.IsNull(this.Events[k][e]))
    {
        this.Events[k][e] = new Array();
    }
    

    this.Events[k][e].push({
        name: n ? n : "func" + this.Events[k][e].length,
        func: c
    });
};
*/


/*
 * Update
 * @public
*/
Duedo.Keyboard.prototype.Update = function(deltaT) {

	var i = this._Keys.length;

    while (i--)
    {
        if (this._Keys[i])
        {
            this._Keys[i].Update(deltaT);
        }
    }

};



/*
 * Null
 * @public
 * Null keypress
*/
Duedo.Keyboard.prototype.Null = function(key) {

	if(!this._Keys[key])
		return null;

	this._Keys[key].Null();

};



/*
 * Disconnect
 * @public
 * Disconnect keyboard listener
*/
Duedo.Keyboard.prototype.Disconnect = function(destroy) {

	window.removeEventListener('keydown', this._KeyDownEvent);
    window.removeEventListener('keyup', this._KeyUpEvent);

    this._KeyDownEvent  = null;
    this._KeyUpEvent    = null;
    this.Enabled        = false;

    if(destroy)
    {
    	this.Destroy();
    }


    return this;
};



/*
 * Destroy
 * @public
*/
Duedo.Keyboard.prototype.Destroy = function() {

	this._Keys = [];
	//this._Captures = [];


	return this;

};


/*
 * Keystate
 * @public
*/
Duedo.Keyboard.prototype.KeyState = function(key) {

	if(!this._Keys[key])
		return false;

	return this._Keys[key].IsDown;

};



/*
 * HeldDuration
 * @public
*/
Duedo.Keyboard.prototype.HeldDuration = function(key) {

	if(!this._Keys[key])
		return false;

	if(this._Keys[key].IsDown)
	{
		return this._Keys[key].HeldTime;
	}
	else
	{
		return false;
	}

};



/*
 * HeldFor
 * @public
 * return true if duration is >= key.HeldTime
*/
Duedo.Keyboard.prototype.HeldFor = function(key, duration) {

	if(!this._Keys[key])
		return false;

	if(this._Keys[key].IsDown)
	{
		return ((this._Keys[key].HeldTime - this.Keyboard.Latency) >= duration);
	}
	else
	{
		return false;
	}

};







/*Keys*/
Duedo.Keyboard.A = "A".charCodeAt(0);
Duedo.Keyboard.B = "B".charCodeAt(0);
Duedo.Keyboard.C = "C".charCodeAt(0);
Duedo.Keyboard.D = "D".charCodeAt(0);
Duedo.Keyboard.E = "E".charCodeAt(0);
Duedo.Keyboard.F = "F".charCodeAt(0);
Duedo.Keyboard.G = "G".charCodeAt(0);
Duedo.Keyboard.H = "H".charCodeAt(0);
Duedo.Keyboard.I = "I".charCodeAt(0);
Duedo.Keyboard.J = "J".charCodeAt(0);
Duedo.Keyboard.K = "K".charCodeAt(0);
Duedo.Keyboard.L = "L".charCodeAt(0);
Duedo.Keyboard.M = "M".charCodeAt(0);
Duedo.Keyboard.N = "N".charCodeAt(0);
Duedo.Keyboard.O = "O".charCodeAt(0);
Duedo.Keyboard.P = "P".charCodeAt(0);
Duedo.Keyboard.Q = "Q".charCodeAt(0);
Duedo.Keyboard.R = "R".charCodeAt(0);
Duedo.Keyboard.S = "S".charCodeAt(0);
Duedo.Keyboard.T = "T".charCodeAt(0);
Duedo.Keyboard.U = "U".charCodeAt(0);
Duedo.Keyboard.V = "V".charCodeAt(0);
Duedo.Keyboard.W = "W".charCodeAt(0);
Duedo.Keyboard.X = "X".charCodeAt(0);
Duedo.Keyboard.Y = "Y".charCodeAt(0);
Duedo.Keyboard.Z = "Z".charCodeAt(0);
Duedo.Keyboard.ZERO = "0".charCodeAt(0);
Duedo.Keyboard.ONE = "1".charCodeAt(0);
Duedo.Keyboard.TWO = "2".charCodeAt(0);
Duedo.Keyboard.THREE = "3".charCodeAt(0);
Duedo.Keyboard.FOUR = "4".charCodeAt(0);
Duedo.Keyboard.FIVE = "5".charCodeAt(0);
Duedo.Keyboard.SIX = "6".charCodeAt(0);
Duedo.Keyboard.SEVEN = "7".charCodeAt(0);
Duedo.Keyboard.EIGHT = "8".charCodeAt(0);
Duedo.Keyboard.NINE = "9".charCodeAt(0);
Duedo.Keyboard.NUMPAD_0 = 96;
Duedo.Keyboard.NUMPAD_1 = 97;
Duedo.Keyboard.NUMPAD_2 = 98;
Duedo.Keyboard.NUMPAD_3 = 99;
Duedo.Keyboard.NUMPAD_4 = 100;
Duedo.Keyboard.NUMPAD_5 = 101;
Duedo.Keyboard.NUMPAD_6 = 102;
Duedo.Keyboard.NUMPAD_7 = 103;
Duedo.Keyboard.NUMPAD_8 = 104;
Duedo.Keyboard.NUMPAD_9 = 105;
Duedo.Keyboard.NUMPAD_MULTIPLY = 106;
Duedo.Keyboard.NUMPAD_ADD = 107;
Duedo.Keyboard.NUMPAD_ENTER = 108;
Duedo.Keyboard.NUMPAD_SUBTRACT = 109;
Duedo.Keyboard.NUMPAD_DECIMAL = 110;
Duedo.Keyboard.NUMPAD_DIVIDE = 111;
Duedo.Keyboard.F1 = 112;
Duedo.Keyboard.F2 = 113;
Duedo.Keyboard.F3 = 114;
Duedo.Keyboard.F4 = 115;
Duedo.Keyboard.F5 = 116;
Duedo.Keyboard.F6 = 117;
Duedo.Keyboard.F7 = 118;
Duedo.Keyboard.F8 = 119;
Duedo.Keyboard.F9 = 120;
Duedo.Keyboard.F10 = 121;
Duedo.Keyboard.F11 = 122;
Duedo.Keyboard.F12 = 123;
Duedo.Keyboard.F13 = 124;
Duedo.Keyboard.F14 = 125;
Duedo.Keyboard.F15 = 126;
Duedo.Keyboard.COLON = 186;
Duedo.Keyboard.EQUALS = 187;
Duedo.Keyboard.UNDERSCORE = 189;
Duedo.Keyboard.QUESTION_MARK = 191;
Duedo.Keyboard.TILDE = 192;
Duedo.Keyboard.OPEN_BRACKET = 219;
Duedo.Keyboard.BACKWARD_SLASH = 220;
Duedo.Keyboard.CLOSED_BRACKET = 221;
Duedo.Keyboard.QUOTES = 222;
Duedo.Keyboard.BACKSPACE = 8;
Duedo.Keyboard.TAB = 9;
Duedo.Keyboard.CLEAR = 12;
Duedo.Keyboard.ENTER = 13;
Duedo.Keyboard.SHIFT = 16;
Duedo.Keyboard.CONTROL = 17;
Duedo.Keyboard.ALT = 18;
Duedo.Keyboard.CAPS_LOCK = 20;
Duedo.Keyboard.ESC = 27;
Duedo.Keyboard.SPACEBAR = 32;
Duedo.Keyboard.PAGE_UP = 33;
Duedo.Keyboard.PAGE_DOWN = 34;
Duedo.Keyboard.END = 35;
Duedo.Keyboard.HOME = 36;
Duedo.Keyboard.LEFT = 37;
Duedo.Keyboard.UP = 38;
Duedo.Keyboard.RIGHT = 39;
Duedo.Keyboard.DOWN = 40;
Duedo.Keyboard.INSERT = 45;
Duedo.Keyboard.DELETE = 46;
Duedo.Keyboard.HELP = 47;
Duedo.Keyboard.NUM_LOCK = 144;

/*
==========================================
Duedo.Key
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager

Notes:
Keyboard input handler
//Bindable events/closures
@onkeyup
@onkeydown
==========================================
*/

Duedo.Key = function(gameContext, keyCode, keyboard) {
	this.Game = gameContext || Duedo.Global.Games[0];

	this.KeyCode  = keyCode || null;
	this.Keyboard = keyboard;
	this.Enabled;
	this._PendingDown;
	this.IsDown;
	this.TDown;

	this.IsUp;
	this.TUp;

	this.Repeated;
	this.HeldTime;

	this._init();
};



//Constructor
//Inherit triggerable
Duedo.Key.prototype = Object.create(Duedo.Object.prototype);
Duedo.Key.prototype.constructor = Duedo.Key;


/*
 * _init
*/
Duedo.Key.prototype._init = function() {

	this.IsDown   = false;
	this.TDown    = 0;
	this.TUp      = 0;
	this.IsUp     = false;
	this.Repeated = 0;
	this.HeldTime = 0;
	this.Enabled  = true;
	this._PendingDown = false;
};


/*
 * ProcessKeyDown
 * @public
*/
Duedo.Key.prototype.ProcessKeyDown = function() {

	if(!this.Enabled || this.IsDown)
	{
		return;
	}


	//this.IsDown = true;
	this._PendingDown = true;
	this.IsUp = false;
	this.TDown  = this.Game.ElapsedTime;

	this.HeldTime = 0;
	this.Repeated = 0;

};


/*
 * ProcessKeyUp
 * @public
*/
Duedo.Key.prototype.ProcessKeyUp = function() {

	if(!this.Enabled || this.IsUp)
	{
		return;
	}


	this.IsDown       = false;
	this._PendingDown = false;
	this.IsUp     = true;
	this.TUp      = this.Game.ElapsedTime;
    this.HeldTime = this.Game.ElapsedTime - this.TDown;

	this.HeldTime = 0;
};


/*
 * Null
 * @public
 * Force key release
*/
Duedo.Key.prototype.Null = function() {

	this.IsDown = false;
	this.IsUp = true;
	this.TUp = this.Game.ElapsedTime;
	this._PendingDown = false;
	//this.HeldTime = this.Game.ElapsedTime - this.TDown;


};


/*
 * Update
 * @public
 * Main key update
*/
Duedo.Key.prototype.Update = function(deltaT) {

	if(!this.Enabled)
		return;

	if (this._PendingDown)
	{
	    if (this.HeldTime >= this.Keyboard.Latency) {
	        this.IsDown = true;
	        this._PendingDown = false;
	    }
	}

	this.HeldTime += deltaT;

};

/*
==========================================
Duedo.Mouse
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager by Richard Davey

Notes:
Mouse input handler
==========================================
*/


/*
 * MouseButton
 * A single button
*/
Duedo.MouseButton = function() {
	this.Down = false;
	this.HeldTime = 0;
};



/*
 * Mouse
*/
Duedo.Mouse = function(gameContext, InputManager) {
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Manager = InputManager || null;

	this.Enabled;
	this.PreventDefault;

	/*Pointer location inside the client*/
	this.ClientLoc;
	/*Pointer location inside the canvas*/
	this.Location;
  /* Previous frame's location */
	this.LastLocation;
	/*Pointer location relative to the whole html document*/
	this.PageLoc;

	//DownRate
	this.DownRate = 0.5;
	this._LastDownTime;

	/*Down button: can be: LEFT, RIGHT OR MIDDLE*/
	this.ButtonLeft;
	this.ButtonRight;
	this.ButtonMiddle;


	/*Used for mouse location history recording*/
	this._NextHistoryPush = 0;
	this._PHistory = [];

	this._PreviousWorldLocation = new Duedo.Vector2(0, 0);

	/*Callbacks*/
	/*
		* Mouse out from canvas
	*/
	this.OutCallback;

    /*
     * Mouse enter canvas
    */
	this.EnterCallback;

    /*
     * LeftClick callback
    */
	this.LeftCallback;

    /*
     * RightClick callback
    */
	this.RightCallback;

    /*
     * MiddleClick callback
    */
	this.MiddleCallback;

    /*
     * // Inverse callback
    */
	this.LeftUpCallback;
	this.RightUpCallback;
	this.MiddleUpCallback;

	this.Debug = false;

	//DoubleClickInterval
	this.DoubleClickInterval = 0.5;

	/*(bool) Is this mouse dragging something?*/
	this._Dragging;

	this._init();
};



/*Duedo.Mouse events*/
Duedo.Mouse.prototype._MouseDownEvent;
Duedo.Mouse.prototype._MouseUpEvent;
Duedo.Mouse.prototype._MouseOutEvent;
Duedo.Mouse.prototype._MouseOverEvent;
Duedo.Mouse.prototype._MouseMoveEvent;


/*Mouse buttons - constant*/
Duedo.Mouse.LEFT_BUTTON   = 1;
Duedo.Mouse.MIDDLE_BUTTON = 2;
Duedo.Mouse.RIGHT_BUTTON  = 3;


/*
 FIX:: Scroll della finestra influenza locazione mouse
*/


/*
 * _Init
 * @private
*/
Duedo.Mouse.prototype._init = function() {

	this.Enabled        = true;
	this.PreventDefault = true;

	/*Init pointers*/
	this.Location  = new Duedo.Vector2(-1, -1);
	this.ClientLoc = new Duedo.Vector2(-1, -1);
	this.PageLoc   = new Duedo.Vector2(-1, -1);
	this.LastLocation = new Duedo.Vector2(-1, -1);

	/*Buttons*/
	this.ButtonLeft   = new Duedo.MouseButton();
	this.ButtonRight  = new Duedo.MouseButton();
	this.ButtonMiddle = new Duedo.MouseButton();
	this.Dragging     = false;

	var _self = this;


	/*STD Events - can be custom*/
	this._MouseDownEvent = function (event) {
      return _self._ProcessMouseDown(event);
  };

  this._MouseUpEvent = function (event) {
      return _self._ProcessMouseUp(event);
  };

  this._MouseOutEvent = function (event) {
      return _self._ProcessMouseOut(event);
  };

  this._MouseOverEvent = function (event) {
      return _self._ProcessMouseOver(event);
  };

  this._MouseMoveEvent = function (event) {
      return _self._ProcessMouseMove(event);
  };


  //Connect
  this.Connect(this.Game.Renderer.Canvas);

};



/*
 * Connect
 * @public
 * Connect mouse listener to the specified target element (ex. canvas)
*/
Duedo.Mouse.prototype.Connect = function(target) {

	if(Duedo.Utils.IsNull(target))
		target = this.Game.Renderer.Canvas;

	/*true: -> use capture*/
	this.Game.Renderer.Canvas.addEventListener("mouseover", this._MouseOverEvent, true);
	this.Game.Renderer.Canvas.addEventListener("mouseout",  this._MouseOutEvent,  true);
	this.Game.Renderer.Canvas.addEventListener("mouseup",   this._MouseUpEvent,   true);
	this.Game.Renderer.Canvas.addEventListener("mousedown", this._MouseDownEvent, true);
	this.Game.Renderer.Canvas.addEventListener("mousemove", this._MouseMoveEvent, true);

};


/**
 * LocationInTheWorld
 * @returns Duedo.Vector2
 */
Duedo.Mouse.prototype.LocationInTheWorld = function() {
	// TODO se zoommo il mouse non è corretto
	return this.Game.Viewport.Location.Clone().DivideScalar(this.Game.Viewport.Zoom).Add(this.Location);
};


/*
 * _ProcessMouseDown
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseDown = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	//Call mouse input callbacks
	switch(event.which)
	{
		case Duedo.Mouse.LEFT_BUTTON:
			this.ButtonLeft.Down   = true;
			this.ButtonLeft.HeldTime = 0;
			if(!Duedo.Utils.IsNull(this.LeftCallback))
				this.LeftCallback.call(this);
			break;

		case Duedo.Mouse.RIGHT_BUTTON:
			this.ButtonRight.Down  = true;
			this.ButtonRight.HeldTime = 0;
			if(!Duedo.Utils.IsNull(this.RightCallback))
				this.RightCallback.call(this);
			break;

		case Duedo.Mouse.MIDDLE_BUTTON:
			this.ButtonMiddle.Down = true;
			this.ButtonMiddle.HeldTime = 0;
			if(!Duedo.Utils.IsNull(this.MiddleCallback))
			 	this.MiddleCallback.call(this);
			 break;
	}

};



/*
 * _ProcessMouseUp
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseUp = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	//Call mouse input callbacks
	switch(event.which)
	{
		case Duedo.Mouse.LEFT_BUTTON:   this.ButtonLeft.Down   = false;   if(!Duedo.Utils.IsNull(this.LeftUpCallback))   this.LeftUpCallback.call(this); break;
		case Duedo.Mouse.RIGHT_BUTTON:  this.ButtonRight.Down  = false;   if(!Duedo.Utils.IsNull(this.RightUpCallback))  this.RightUpCallback.call(this); break;
		case Duedo.Mouse.MIDDLE_BUTTON: this.ButtonMiddle.Down = false;   if(!Duedo.Utils.IsNull(this.MiddleUpCallback)) this.MiddleUpCallback.call(this); break;
	}

};



/*
 * _ProcessMouseOver
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseOver = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	if(this.EnterCallback)
		this.EnterCallback.call(this);

};



/*
 * _ProcessMouseOut
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseOut = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	if(this.OutCallback)
		this.OutCallback.call(this);

};


/*
 * _ProcessMouseMove
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseMove = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
	    this._PreventDefault(event);

	/*Client loc*/
	this.ClientLoc.X = event.clientX;
	this.ClientLoc.Y = event.clientY;

	/*Pageloc*/
	this.PageLoc.X   = event.pageX;
	this.PageLoc.Y   = event.pageY;

	var cvBRect = this.Game.Renderer.Canvas.getBoundingClientRect();

	// Location in the canvas
	this.Location.X = (this.ClientLoc.X - cvBRect.left) * (this.Game.Renderer.Canvas.width / cvBRect.width);
	this.Location.Y = (this.ClientLoc.Y - cvBRect.top)  * (this.Game.Renderer.Canvas.height / cvBRect.height);

	if(this.Debug) {
		// console.log('Zoom', this.Game.Viewport.Zoom);
		console.info(`Mouse location in canvas: ${this.Location.X}, ${this.Location.Y}`);
		console.info(`Mouse location in world: ${this.WorldLocation.X}, ${this.WorldLocation.Y}`);
		if(this.WorldLocation.X > this.Game.World.Bounds.Width || this.WorldLocation.Y + this.Game.Viewport.View.Location.Y > this.Game.World.Bounds.Height ) {
			console.error('Warning: mouse location outside of world bounds')
		}
	}
};


/*
 * Update
 * @public
*/
Duedo.Mouse.prototype.Update = function(deltaT) {

	if(!this.Enabled)
		return;

	/*Record mouse movement history*/
	if(this.Manager.RecordMouseHistory && (this.Game.ElapsedTime > this._NextHistoryPush))
	{
		this._NextHistoryPush = this.Manager.HistoryPushRate + this.Game.ElapsedTime;

		this._PHistory.push(new Duedo.Vector2(this.Location.X, this.Location.Y));

		if(this._PHistory.length >= this.Manager.HistoryRecordLimit)
			this._PHistory.shift();
	}


	/*Update held time*/
	if(this.ButtonLeft.Down)
		this.ButtonLeft.HeldTime += deltaT;
	if(this.ButtonMiddle.Down)
		this.ButtonMiddle.HeldTime += deltaT;
	if(this.ButtonRight.Down)
		this.ButtonRight.HeldTime += deltaT;


};


/*
 * PostUpdate
 * @public
*/
Duedo.Mouse.prototype.PostUpdate = function (dt) {
		
		this.LastLocation.Copy(this.Location);

		this._PreviousWorldLocation = new Duedo.Vector2(
			(this.LastLocation.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X) / Duedo.Conf.PixelsInMeter,
			(this.LastLocation.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y) / Duedo.Conf.PixelsInMeter
		)
};



/*
 * GetMouseHistory
 * @public
*/
Duedo.Mouse.prototype.GetMouseHistory = function() {
	return this._PHistory;
};


/*
 * ClearMouseHisotry
 * @public
*/
Duedo.Mouse.prototype.ClearMouseHistory = function() {
	return this._PHistory = [];
};


/*
 * IsDown
 * @public
 * Return true if buttonInt is down: Duedo.Mouse.LEFT/RIGHT/MIDDLE_BUTTON
*/
Duedo.Mouse.prototype.IsDown = function(buttonInt) {


	switch(buttonInt) {
		case Duedo.Mouse.LEFT_BUTTON:   down = this.ButtonLeft.Down;   break;
		case Duedo.Mouse.RIGHT_BUTTON:  down = this.ButtonRight.Down;  break;
		case Duedo.Mouse.MIDDLE_BUTTON: down = this.ButtonMiddle.Down; break;
	}

	return down;

};



/*
 * _PreventDefault
 * @private
*/
Duedo.Mouse.prototype._PreventDefault = function(event) {

	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;

};



/*
 * Intersect
 * Check for intersection between mouse pointer and object
 * The comparison is made in meters relatively to the canvas
*/
Duedo.Mouse.prototype.Intersects = function(object) {

	if(Duedo.Utils.IsNull(object)) {
		return false;
	}

	// Get location relative to the canvas
	const cvBRect = this.Game.Renderer.Canvas.getBoundingClientRect();
	const LocationToCompare =  new Duedo.Vector2(
		(this.ClientLoc.X - cvBRect.left) * (this.Game.Renderer.Canvas.width / cvBRect.width),
		(this.ClientLoc.Y - cvBRect.top)  * (this.Game.Renderer.Canvas.height / cvBRect.height)
	);

	if(!object.FixedToViewport) {
		// Objects in the world are affected by zoom
		LocationToCompare.DivideScalar(this.Game.Viewport.Zoom);
	}

	LocationToCompare.DivideScalar(Duedo.Conf.PixelsInMeter); // convert coords to meters

	if(object["Contains"]) // for example geometries
	    return object.Contains(LocationToCompare.X, LocationToCompare.Y);

	if(!object.FixedToViewport) {
		objLoc = object.Location.Clone()
			// bring anchor on top left
			.Subtract(new Duedo.Vector2(object.Width * object.Anchor.X, object.Height * object.Anchor.Y))
			// make it relative to the canvas
			.Subtract(this.Game.Viewport.View.GetAsVector())
	} else {
		objLoc = object.ViewportOffset.Clone()
			.Subtract(new Duedo.Vector2(object.Width * object.Anchor.X, object.Height * object.Anchor.Y))
	}

	if(
		LocationToCompare.X >= objLoc.X
		&& LocationToCompare.X <= objLoc.X + object.Width
		&& LocationToCompare.Y >= objLoc.Y
		&& LocationToCompare.Y <= objLoc.Y + object.Height
    )
    {
        return true;
    }

    return false;
};



/**
 * Check if the mouse intersects the object or any of its children connected to it
 * @param {*} object 
 * @returns 
 */
Duedo.Mouse.prototype.IntersectsRecursive = function(object) {
	if(this.Intersects(object)) {
		return true;
	} else {
		if(object.ChildrenList.HasChildren()) {
			for(let i = 0; i <= object.ChildrenList.Length; i++) {
				return this.IntersectsRecursive(object.ChildrenList.List[i]);
			}
		} else {
			return false;
		}
	}
};



/*
 * Disconnect
 * @public
 * Disconnect the mouse from his target element
*/
Duedo.Mouse.prototype.Disconnect = function() {

	this.Game.Renderer.Canvas.removeEventListener("mouseover", this._MouseOverEvent, true);
	this.Game.Renderer.Canvas.removeEventListener("mouseout",  this._MouseOutEvent,  true);
	this.Game.Renderer.Canvas.removeEventListener("mouseup",   this._MouseUpEvent,   true);
	this.Game.Renderer.Canvas.removeEventListener("mousedown", this._MouseDownEvent, true);
	this.Game.Renderer.Canvas.removeEventListener("mousemove", this._MouseMoveEvent, true);

};



/*
 * Null
 * @public
 * Hard-release button
*/
Duedo.Mouse.prototype.Null = function(buttonInt) {
	switch(buttonInt) {
		case Duedo.Mouse.LEFT_BUTTON:   return this.ButtonLeft.Down = false;
		case Duedo.Mouse.RIGHT_BUTTON:  return this.ButtonRight.Down = false;
		case Duedo.Mouse.MIDDLE_BUTTON: return this.ButtonMiddle.Down = false;
		default:
			this.ButtonLeft.Down   = false;
			this.ButtonRight.Down  = false;
			this.ButtonMiddle.Down = false;
		break;
	}
};



/*
 * Draw
 * @public
 * Draw custom mouse pointer
*/
Duedo.Mouse.prototype.Draw = function() {

	if(this.Manager.MouseGPointer)
		this.Game.Renderer.Context.drawImage(this.Manager.MouseGPointer,
			this.Location.X + this.Game.Viewport.View.X,
			this.Location.Y + this.Game.Viewport.View.Y,
			this.Manager.MouseGPointerDim.Width, this.Manager.MouseGPointerDim.Height);

};


/*
 * Dragging
*/
Object.defineProperty(Duedo.Mouse.prototype, "Dragging", {
    get: function () {
        return this._Dragging;
    },
    set: function (bool) {
        return this._Dragging = bool;
    }
});


/*
 * Return true if the mouse is moving during this frame
*/
Object.defineProperty(Duedo.Mouse.prototype, "IsMoving", {

    get: function () {
        return !Duedo.Vector2.Compare(this.Location, this.LastLocation);
    }

});


Object.defineProperty(Duedo.Mouse.prototype, "Width", {

    get: function () {
        return 1;
    }

});


Object.defineProperty(Duedo.Mouse.prototype, "Height", {

    get: function () {
        return 1;
    }

});



/**
 * World location
 * unit: meters
 */
Object.defineProperty(Duedo.Mouse.prototype, "WorldLocation", {

	get: function() {
		return new Duedo.Vector2(
			(this.Location.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X) / Duedo.Conf.PixelsInMeter,
			(this.Location.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y) / Duedo.Conf.PixelsInMeter
		);
	}

});



/**
 * Previous world location
 * unit: meters
 */
Object.defineProperty(Duedo.Mouse.prototype, "PreviousWorldLocation", {

	get: function() {
		return this._PreviousWorldLocation.Clone();
	}

});



/*
==============================
Duedo.InteractiveObjects
Author: http://www.edoardocasella.it

Notes:
Stores, serves and manage all the input-interactive objects
Can use a quadtree

Notes:
------------------------------------------------------------------
How to, ex:
myGraphicObject.Interactive = true;
myGraphicObject.OnPointerUp = myfunction;

--- @Mouse events:
- OnPointerUpOut
- OnPointerDown
- OnPointerMove
- OnPointerOn
- OnDragging
--- @Bool
- Draggable {def: false}
- DragVertical {def: true}
- DragOrizontal {def: true}
- DragBringToTop {def: true}
- DragScale {def:1}
- DragMinAlpha {def: 0.5}

For more complete informations: Duedo.InteractiveProperties.js
------------------------------------------------------------------

Note: To use a QUADTREE use the function UseQuadTree( @quadtree q );

==============================
*/

Duedo.InteractivityManager = function(gameContext) {
	this.Game = gameContext || Duedo.Global.Games[0];

	//A little cache
	this._Cache = {};

	//Setup
	this.DragButton = Duedo.Mouse.LEFT_BUTTON;

	this.Empty = true;

	/*
	 * InteractiveObjects collection
	 * @static public
	*/
	this.Collection;

	/*
	 * Use a quadtree
	 * (too much interactive objects)
	*/
	this.QuadTree;
	/*
	 * @bool: Is this manager active?
	*/
	this.Active;

	/*
	 * TODO The collection has been altered? (additon, removal..) 
	*/
	this._Altered = false;

	/*
	* Drag
	* @private
	*/
	this._HookedObject;
	this._LastOvered;
	this._DragMouseLastLocation = null;
	this._Dragging = false;
	this._PointerWasDownOut = false;


	/*Manager events*/
	/*
	* When the pointer is down
	* on a non-interactive part
	*/
	this.OnPointerDownOut = null;
	this.OnPointerUpOut = null;

	//Initialize
	this._Init();
};


/*
=====================
_Init
@private
=====================
*/
Duedo.InteractivityManager.prototype._Init = function() {

	this.Collection      = {Entities: []};
	this.Active          = true;
	this.Highest         = 0;
	this.Least           = 0;
	this.Pointers        = [];

};


/*
 * Use a quadtree
 * Requests the support of a quadtree
*/
Duedo.InteractivityManager.prototype.UseQuadTree = function (qt) {

	if (this.QuadTree) return;

	this.QuadTree = qt;

	/*Move old entities to the new quadtree*/
	if (this.Collection["Entities"].length)
		for (var i = this.Collection["Entities"].length - 1; i >= 0; i--) {
			this.QuadTree.Add(this.Collection["Entities"][i]);
			this.Collection["Entities"].splice(i, 1);
		}
};


/*
=====================
AddPointer
@private
=====================
*/
Duedo.InteractivityManager.prototype.AddPointer = function(pointer) {
	this.Pointers.push(pointer);
};


/*
=====================
Update
@public
=====================
*/
Duedo.InteractivityManager.prototype.Update = function(dt) {

	if (this.Empty) return;

	//Update the quadtree
	//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FIX:
	if (this.QuadTree) this.QuadTree.Update();

	var Pointer = this.Game.InputManager.Mouse;

	//We have or had a dragged object
	if (this._HookedObject) {
		// ...was hooked, now we left it
		if(!Pointer.IsDown(this.DragButton)) {
			Pointer.Dragging = false;

			// Update game status
			this.Game.Status.DraggingObject = false;

			this._UpdatePointerInteractions(Pointer);

			if (typeof this._HookedObject._Cache['OriginalZValue'] != "undefined")
			{
				this._HookedObject.Z = this._HookedObject._Cache['OriginalZValue'];
				delete this._HookedObject._Cache['OriginalZValue'];
			}

			// Reset
			this._HookedObject.LeftClicked = false;
			this._HookedObject._Dragging = false;
			this._HookedObject._WasDragged = false;
			this._HookedObject = null;
			this.Game.Status.HookedObject = null;
			this._DragMouseLastLocation = null;
		}
		else
		{
			if(Pointer.IsMoving && this._HookedObject.Draggable) {
				this._UpdateDragging();
			} else {
				this._HookedObject._Dragging = false;
			}
		}
	}
	else
	{
		this._UpdatePointerInteractions(Pointer);
	}

	return this;

};



/*
=====================
_UpdateDragging
@private
=====================
*/
Duedo.InteractivityManager.prototype._UpdateDragging = function () {

	if (this._HookedObject.Body)
		return;

	var obj   = this._HookedObject,
		Pointer = obj.Pointer;

	if (!this._DragMouseLastLocation)
		if (!Duedo.Vector2.Compare(this._DragMouseLastLocation, Pointer.Location))
			this._DragMouseLastLocation = Pointer.Location.Clone();


	if (obj.DragBringToTop && typeof obj._Cache['OriginalZValue'] == "undefined")
	{
		obj._Cache['OriginalZValue'] = obj.Z;
		obj.Z = this.Game.Renderer.MaxZPlane + 1;
	}

	//Calculate drag vector
	var DeltaMouse = Pointer.Location.Clone().Subtract(this._DragMouseLastLocation);
	var DirVector = DeltaMouse.MultiplyScalar(obj.DragScale);

	if(DirVector.Magnitude() == 0) {
		return;
	}

	// Pointer is dragging
	Pointer.Dragging = true;
	// Update game status
	this.Game.Status.DraggingObject = true;

	// This object has been drag at least once
	obj._WasDragged = true;

	//Check axis motion
	if (!obj.DragVertical) {
		DirVector.Y = 0;
	}

	if (!obj.DragHorizontal) {
		DirVector.X = 0;
	}

	//Update coordinates
	DirVector.DivideScalar(Duedo.Conf.PixelsInMeter);

	if (obj.FixedToViewport) {
		obj.ViewportOffset.Add(DirVector);
	} 
	else if (obj["Offset"]) {
			/*Child element*/
	    obj.Offset.Add(DirVector.DivideScalar(this.Game.Viewport.Zoom));
	}
	else
	{
		obj.Location.Add(DirVector.DivideScalar(this.Game.Viewport.Zoom));
	}

	//Keeps track of the last position of the pointer
	this._DragMouseLastLocation = Pointer.Location.Clone();

	obj._Dragging = true;

};



/*
=====================
_UpdatePointerInteractions
@private
=====================
*/
Duedo.InteractivityManager.prototype._UpdatePointerInteractions = function (ptr) {

	if (Duedo.Utils.IsNull(ptr))
		return;

	/*Get interactive objects*/
	var obs = this.GetAll(
		this.ToCameraCoord(ptr));

	var Pointer = ptr;

	/*FIX: Sort only when altered*/
	//if (this._Altered) {
	this._Cache["SortedByZ"] = this._SortElements(obs, "RenderOrderID");
	this._Altered = false;
    //}
	
	for (var i in this._Cache["SortedByZ"]) {
		var obj = this._Cache["SortedByZ"][i];

		if (!obj.InteractionEnabled)
			continue;

		if (obj.ParentState == this.Game.StateManager.CurrentState() || obj.ParentState == -1)
		{
			this._TriggerEvents(obj, Pointer);
		}
	}

	/*Mouse down on a non-interactive element*/
	if (Pointer.IsDown(this.DragButton)) {
		this._PointerWasDownOut = true;
		if (this.OnPointerDownOut)
			this.OnPointerDownOut.call(this._HookedObject);
	}

	/*Mouse up on non-interactive element*/
	if (this._PointerWasDownOut && !Pointer.IsDown(this.DragButton))
	{
		this._PointerWasDownOut = false;
		if (this.OnPointerUpOut)
			this.OnPointerUpOut.call(this);
	}

	return;

};



/**
 * _TriggerEventss
 */
Duedo.InteractivityManager.prototype._TriggerEvents = function(obj, Pointer) {
	
		if (Pointer.Intersects(obj)) {
			
			if (this._LastOvered != null && this._LastOvered != obj) {
				this._OnPointerOut(this._LastOvered);
			}

			this._LastOvered = obj;

			//Mouse was clicked elsewhere
			if (Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && !obj._PointerWasOver) {
				return;
			}

			if (!Duedo.Vector2.Compare(Pointer.Location, Pointer.LastLocation)) {
				if (obj.OnPointerMove) {
					obj.OnPointerMove.call(obj);
				}
			}

			if (!Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && !obj._WasDragged && obj._MouseClickedOn) {
				obj._MouseClickedOn = false;
				if(obj.OnClick) {
					obj.OnClick.call(obj);
				}
			}

			//OnPointerOn
			if (obj.OnPointerOn && !obj._OnPointerOnCalled) {
				obj.OnPointerOn.call(obj);
				obj._OnPointerOnCalled = true;
			}

			//First: MouseHover
			obj.MouseIsOver = true;
			obj._PointerWasOver = true;

			if (Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && !obj.LeftClicked) {
				obj.LeftClicked = true;
				if (obj.OnPointerDown)
					obj.OnPointerDown.call(obj);
			}

			if (Pointer.IsDown(Duedo.Mouse.RIGHT_BUTTON) && !obj.RightClicked) {
				obj.RightClicked = true;
				if (obj.OnRightClick)
					obj.OnRightClick.call(obj);
			}

			if (Pointer.IsDown(this.DragButton)) {
					obj._MouseClickedOn = true;
					this._HookedObject = obj;
					this.Game.Status.HookedObject = obj;
					this._HookedObject.Pointer = Pointer;
			} else {
				obj._MouseClickedOn = false;
			}

			return;
		}
		else
		{
			if (obj._PointerWasOver)
			{
				this._OnPointerOut(obj);
				if(obj._MouseClickedOn) {
					obj._MouseClickedOn = false;
				}
			}
		}

}



/*
 ======================
 ToCameraCoord
 @public
 @Support function
 ======================
*/
Duedo.InteractivityManager.prototype.ToCameraCoord = function (o) {
	return new Duedo.Rectangle(o.Location.Clone().Add(this.Game.Camera.View.Location), 1, 1);
};



/*
 * PostUpdate
 * Main PostUpdate
*/
Duedo.InteractivityManager.prototype.PostUpdate = function () {

	/*Post update dragging*/
	if (this._HookedObject && this._HookedObject._Dragging) {
		if (Duedo.IsFunc(this._HookedObject.OnDragging))
			this._HookedObject.OnDragging.call(this._HookedObject);
	}

};


/*
=====================
_OnPointerOut
@private
=====================
*/
Duedo.InteractivityManager.prototype._OnPointerOut = function (obj) {

	obj._PointerIsOver = false;
	obj._PointerWasOver = false;
	obj.LeftClicked = false;
	obj.RightClicked = false;
	obj._OnPointerOnCalled = false;

	if (obj.OnPointerOut)
		obj.OnPointerOut.call(obj);

};



Duedo.InteractivityManager.prototype._SortElements = function (obs, by) {
	obs = Duedo.Utils.SortArrayDescending(obs, by);
	/*ADD/FIX: se pi� oggetti hanno lo stesso Z chi viene usato per prima? Stessa cosa nel renderer*/
	return obs;
};



/*
 * Add
 * @public
 * Add an object to the current list
*/
Duedo.InteractivityManager.prototype.Add = function(object) {

	Object.ExtendDeeply(object, Duedo.InteractiveProperties);

	if (this.QuadTree) {
	    this.QuadTree.Add(object);
	}
	else
	    this.Collection["Entities"].push(object);

	this.Empty = false;
	this._Altered = true;

	return object;

};



/*
 * Remove
 * @public
 * Remove an object from the interactivity manager
*/
Duedo.InteractivityManager.prototype.Remove = function (obj) {

	if (!obj) return false;

	var index = this.Collection['Entities'].indexOf(obj);
	if (index != -1)
		this.Collection['Entities'].splice(index, 1);

	if (this.Collection['Entities'].length == 0)
		this.Empty = true;

	this._Altered = true;

	return false;
};



/*
 * GetAll
 * @public
 * Return all the interesting objects
 * @param optional pointer: a pointer
*/
Duedo.InteractivityManager.prototype.GetAll = function(pointer){

	if (this.QuadTree)
		return this.QuadTree.Retrieve(pointer);

	return this.Collection["Entities"];

};



/*
 * IsValidTarget
 * @public
 * Is this object valid for interactions?
*/
Duedo.InteractivityManager.prototype.IsValidTarget = function (obj) {

	if (obj.Scale.X === 0 || obj.Scale.Y === 0)
		return false;

	if (obj.Alpha < this.DragMinAlpha)
		return false;

	return true;

};




/*
Duedo.InteractiveObjects.prototype.GetHighestPriorityObject = function() {

	var cState = this.Game.StateManager.CurrentState();

	var Collection = this.Collection;

	if (Duedo.Null(Collection[cState]))
		return null;

	var Higher     = Collection[cState][0];

	//Omit items that do not belong to the current state
	for(var i in Collection)
	{
		if(Collection[cState][i].RenderOrderID > Higher.RenderOrderID)
			Higher = Collection[cState][i];
	}

	return (this.Higher = Higher);

};


Duedo.InteractiveObjects.prototype.GetLeastPriorityObject = function() {

	var Collection = this.Collection;

	var cState = this.Game.StateManager.CurrentState();

	if (Duedo.Null(Collection[cState]))
		return null;

	var Least = Collection[cState][0];

	//Omit items that do not belong to the current state
	for(var i in Collection[cState])
	{
		if(Collection[cState][i].RenderOrderID < Least.RenderOrderID)
			Least = Collection[cState][i];
	}

	return this.Least = Least;
};

*/

/*
==============================
Duedo.InteractiveProperties
Author: http://www.edoardocasella.it

Notes:
Handle user interaction with the graphic object
==============================
*/


Duedo.InteractiveProperties = {

    InteractionEnabled: true,


	/*=====================
	 DRAG PROPERTIES   
	 ======================*/
	Draggable:false,

	/*
	* Enable horizontal drag {drag on Y axis}
	*/
	DragHorizontal:true,

	/*
	* Enable vertical drag {drag on X axis}
	*/
	DragVertical:true,

	/*
	* We wish to bring to top our dragged object?
	*/
	DragBringToTop:false,

	/*
	* Drag scale
	*/
	DragScale: 1,

	/*
	 * DragMinAlpha
     * Minimum opacity needed by drag event
	*/
	DragMinAlpha: 0.5,

	/*
	* The mouse button to be used to drag
	*/
	DragMouseButton: Duedo.Mouse.LEFT_BUTTON,





    /*=====================
    CLICK PROPERTIES, EVENTS   
    ======================*/

    OnPointerDown: null,
		OnClick: null,
    OnPointerUp: null,
    OnPointerOut: null,
    OnPointerOn: null,
    OnPointerMove: null,
    OnDragging: null,


    /*
	 * Private
	*/
    _LastClick: null,
    _WasOver: false,
    _PointerWasOver: false,  //new
    _PointerIsOver: false,
    _OnPointerOnCalled: false,
	_isMouseOver: false,
	_Clicked: false,
    /*
    * @private
    * Are we dragging this object?
    * Use Duedo.GraphicObject.Dragging to know about
    */
	_Dragging: false,
    /*
    * Store mouse delta 
    */
	_DragMouseLastLocation: null,
    /*
    * Internal cache
    */
	_Cache: {}

};



/*
==============================
Duedo.Viewport
Author: http://www.edoardocasella.it
Thanks to: Phaser.js

 * Viewport bindable events
   -update
   -targetlocked
 *

 ! To modify Camera Location use: mygame.Viewport.View <-

 To drag:
 press the support key while dragging
 this.DragSupportKey

 About zooming
 https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate

 ? To prevent scaling on mobile
 <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0,       user-scalable=0' >
==============================
*/

Duedo.Viewport = function ( gameContext, ViewWidth, ViewHeight ) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.VIEWPORT;
	this._Debug = false;

	/*
	To modify width and height values see defined property Width and Height
	that are at the bottom of this page
	*/
	this.View;

	this.Translation;

	this.Target;

	this.Deadzone;

	this.AtLimitX = false;
	this.AtLimitY = false;

	this.Offset = new Duedo.Vector2(null, null);
	this.Bounds;

	this._Edge;

	// Zoom
	this._Zoom = 1;
	this._Zoomed = false;
	this.ZoomMax = 5;
	this.ZoomMin = Duedo.Conf.MinimumZoom;
	
	this.OriginalView = {
		Width: null,
		Height: null
	}

	/*Dragging properties*/
	this.DragScale = 0.5;
	this.Slide = false;
	this._DragAcceleration = new Duedo.Vector2(0, 0);
	this._Velocity = new Duedo.Vector2(0, 0);
	// this.DragMouseOnly = 
	this.DragSupportKey = Duedo.Keyboard.SHIFT;
	this.DragPreventFollow = false;

	/*Initialize*/
	return this._init(ViewWidth, ViewHeight);

};

/*Inherit GraphicObject*/
Duedo.Viewport.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Viewport.prototype.constructor = Duedo.Viewport;



/*"following styles"*/
Duedo.Viewport.FOLLOW_XY = 1; //default
Duedo.Viewport.FOLLOW_X  = 2;
Duedo.Viewport.FOLLOW_Y  = 3;



/*
 * _init
 * @private
*/
Duedo.Viewport.prototype._init = function ( ViewWidth, ViewHeight) {
	this._super();

	if( Duedo.Utils.IsNull(this.Game.World) )
	{
		throw "Duedo.Viewport._init: cannot instantite viewport.";
	}

	/*Translation vector*/
	this.Translation = new Duedo.Vector2(0, 0);

	/*Viewport location/dimension*/
	this.View = new Duedo.Rectangle(new Duedo.Vector2(0, 0), ViewWidth / Duedo.Conf.PixelsInMeter, ViewHeight / Duedo.Conf.PixelsInMeter);

	this.OriginalView = {
		Width: ViewWidth / Duedo.Conf.PixelsInMeter,
		Height: ViewHeight / Duedo.Conf.PixelsInMeter,
		X: this.View.Location.X,
		Y: this.View.Location.Y
	}

	/*Reference to the world bounds*/
	this.Bounds            = new Duedo.Rectangle();
	this.Bounds.Location.X = 0;
	this.Bounds.Location.Y = 0;
	this.Bounds.Width      = this.Game.World.Bounds.Width;
	this.Bounds.Height     = this.Game.World.Bounds.Height;

	/*Locations vectors2*/
	this.Location     = this.View.Location;
	this.LastLocation = new Duedo.Vector2(0, 0);

	
	return this;
};





/*
 * Follow
 * @public
 * Follow a target
 * @target: target must be an instance of GraphicObject or at least an object having a location vector and a dimension
*/
Duedo.Viewport.prototype.Follow = function ( object, style ) {

	if(Duedo.Utils.IsNull(object) || Duedo.Utils.IsNull(object["Location"]))
		return null;

	this.Target = object;
	
	switch (style)
	{
		case Duedo.Viewport.FOLLOW_X:
			//TODO:
			break;

		case Duedo.Viewport.FOLLOW_Y:
			//TODO:
			break;

		case Duedo.Viewport.FOLLOW_XY:
		default:
			/*Set deadzone - both axis following */
			var w = this.View.Width / 8;
			var h = this.View.Height / 3;
			this.Deadzone = new Duedo.Rectangle( new Duedo.Vector2( (this.View.Width - w) / 2, (this.View.Height - h) / 2 - h * 0.25), w, h);
			break;
	}

	// TODO CHECK ! (testa con parallasse attivo)
	this.LastLocation = this.Target.Location.Clone();

	//TargetLocked event
	this._CallTriggers("targetlocked");

	return this;
};


/**
 * Reset viewport with new dimension
 * @param {*} width 
 * @param {*} height 
 */
Duedo.Viewport.prototype.Reset = function(width, height) {
	this._init(width, height);
}



/*
 * PreUpdate
 * @public
*/
Duedo.Viewport.prototype.PreUpdate = function() {

   if(this._Draggable && !this.Target)
   {
		this._FavorsDragging();
   }

};



/*
 * _UpdateTargetDependacy
 * @private
*/
Duedo.Viewport.prototype._UpdateTargetDependancy = function() {

	if(!this.Target)
		return;

	if(this._Dragging && this.DragPreventFollow)
		return;

	/*Are we following a target?*/
	this.UpdateTranslation();

};



/*
 * Main update
 * @public
*/
Duedo.Viewport.prototype.Update = function ( deltaT ) {

   this._UpdateTargetDependancy();

	/*Update animations*/
	this.UpdateAnimations( deltaT );
	// View react animations
	this.View.UpdateAnimations( deltaT );

	/*Check camera collision*/
	if( this.Bounds )
	{
		this.UpdateBoundsCollision();
	}

	// Calculate camera size based on zoom
	this.View.Width = this.OriginalView.Width / this._Zoom;
	this.View.Height = this.OriginalView.Height / this._Zoom;

	this._UpdateOffset();

	/*Update translation*/
	this.Location = this.View.Location.Clone();


	if (!Duedo.Vector2.Compare(this.LastLocation, this.Location))
	{
		this.Translation = this.Location.Clone().Subtract(this.LastLocation);
	}
	else
	{
		this.Translation.MultiplyScalar(0);
	}

	return this;

};



/**
 * _UpdateOffset
 * @returns 
 */
Duedo.Viewport.prototype._UpdateOffset = function() {

	let FinalOffset = new Duedo.Vector2(0, 0);

	if(this._Zoomed && !this.Game.IsMobile) {
		// Zoom toward the mouse	
		const CameraTranslation = this.Game.InputManager.Mouse.PreviousWorldLocation
			.Clone()
			.Subtract(this.Game.InputManager.Mouse.WorldLocation);
		
		const FinalPosition = this.View.Location.Clone().Add(CameraTranslation);
		
		this.SetPosition(
			FinalPosition.X,
			FinalPosition.Y
		)

		this._Zoomed = false;

		this._Velocity.Reset();

	}

	FinalOffset.Copy(this.View.Location);

	this.Offset.X = FinalOffset.X;
	this.Offset.Y = FinalOffset.Y;

	return this;
}



/*
 * PostUpdate
*/
Duedo.Viewport.prototype.PostUpdate = function(deltaT) {
   this.LastLocation = this.Location.Clone();
};



/*
 * UpdateTranslation
 * @private
*/
Duedo.Viewport.prototype.UpdateTranslation = function () {

	//Pixel to meters location
	this.mLocation = this.Target.Location.Clone(); // location is always scaled by meters per pixel

	/*...follow target - there is a Deadzone */
	if( this.Deadzone )
	{
		this._Edge = this.mLocation.X - this.Deadzone.Location.X;

		if (this.View.Location.X > this._Edge)
		{
			this.View.Location.X = this._Edge;
		}

		this._Edge = this.mLocation.X/* + this.Target.Width */- this.Deadzone.Location.X - this.Deadzone.Width;

		if (this.View.Location.X < this._Edge)
		{
			this.View.Location.X = this._Edge;
		}

		this._Edge = this.mLocation.Y - this.Deadzone.Location.Y;

		if (this.View.Location.Y > this._Edge)
		{
			this.View.Location.Y = this._Edge;
		}

		this._Edge = this.mLocation.Y/* + this.Target.Height*/ - this.Deadzone.Location.Y - this.Deadzone.Height;

		if (this.View.Location.Y < this._Edge)
		{
			this.View.Location.Y = this._Edge;
		}
	}
	else
	{
		this.FocusOnXY( this.mLocation.X, this.mLocation.Y );
	}

	return this;

};




/*
 * _FavorsDragging
*/
Duedo.Viewport.prototype._FavorsDragging = function() {

	var mouse = this.Game.InputManager.Mouse;

	if(!this._DragMouseLastLocation)
		if(!Duedo.Vector2.Compare(this._DragMouseLastLocation, mouse.Location))
			this._DragMouseLastLocation = mouse.Location.Clone();
	
	//Should be pressed both LEFT_BUTTON and at least a Duedo key {ex: Duedo.Keyboard.CONTROL}
	if(
		(!mouse.IsDown(Duedo.Mouse.LEFT_BUTTON) || !this.Game.InputManager.Keyboard.KeyState(this.DragSupportKey)) && this.DragSupportKey
		|| !mouse.IsDown(Duedo.Mouse.LEFT_BUTTON))
	{
		if(this._Dragging) {
			document.body.style.cursor = 'auto';
		}
		this._Dragging = false;
		this._DragMouseLastLocation = mouse.Location.Clone();
	}

	var DeltaMouse = mouse.Location.Clone().Subtract(this._DragMouseLastLocation).DivideScalar(Duedo.Conf.PixelsInMeter)/*.MultiplyScalar(20)*/;

	if(DeltaMouse.Magnitude() != 0) {
		document.body.style.cursor = 'grab';
		this._Dragging = true;
	}
	
	DeltaMouse.DivideScalar(this.Zoom);

	var DirVector = DeltaMouse.Clone();

	const deltaSlideMinimumThreshold = 0.1;
	const cameraMass = 5;

	if(this.Slide && DeltaMouse.Magnitude() >= deltaSlideMinimumThreshold ||  this._Velocity.Magnitude()) {

		if(!this.Game.Status.DraggingObject && !this.Game.Status.HookedObject) {
			// Reset velocity if mouse down
			if(mouse.IsDown(Duedo.Mouse.LEFT_BUTTON)) {
				this._Velocity.MultiplyScalar(0);
			}

			// Slide only for
			this._DragAcceleration = DeltaMouse.DivideScalar(1).MultiplyScalar(-1);
		}
		
		const relFriction = this._Velocity.Clone()
			.MultiplyScalar(-1)
			.Normalize()
			.MultiplyScalar( /*coefficient of friction*/ 0.1 * /*normal force (perpendicular to object)*/ 1);
		
		this._DragAcceleration.Add(relFriction.DivideScalar(cameraMass));

		this._Velocity.Add(this._DragAcceleration).Limit(8.5);
		this.View.Location.Add(this._Velocity);

		if(this._Velocity.Magnitude() < 0.01) {
			this._Velocity.Reset();
		}

		// Reset acceleration
		this._DragAcceleration.MultiplyScalar(0);
	} else {
		if(!this.Game.Status.DraggingObject && !this.Game.Status.HookedObject) {
			DirVector.MultiplyScalar(this.DragScale).Negate();
			this.View.Location.X += DirVector.X;
			this.View.Location.Y += DirVector.Y;
		}
	}

	this._DragMouseLastLocation = mouse.Location.Clone();

};





/*
 * UpdateBoundsCollision
 * @private
*/
Duedo.Viewport.prototype.UpdateBoundsCollision = function () {
	
	/*...check bounds collision*/
	this.AtLimitX = false;
	this.AtLimitY = false;
	
	//X
	if( this.View.Location.X <= this.Bounds.Location.X )
	{
		this.AtLimitX = true;
		this.View.Location.X = this.Bounds.Location.X;
	}
	
	if( this.View.Location.X + this.View.Width >= this.Bounds.Location.X + this.Bounds.Width )
	{
		this.AtLimitX = true;
		this.View.Location.X = (this.Bounds.Location.X + this.Bounds.Width) - this.View.Width;
	}

	//Y
	if (this.View.Location.Y <= this.Bounds.Location.Y)
	{
		this.AtLimitY = true;
		this.View.Location.Y = this.Bounds.Location.Y;
	}

	if (this.View.Location.Y + this.View.Height >= this.Bounds.Location.Y + this.Bounds.Height)
	{
		this.AtLimitY = true;
		this.View.Location.Y = (this.Bounds.Location.Y + this.Bounds.Height) - this.View.Height;
	}

	return this;

};



/*
 * FocusOnXY
 * @public
*/
Duedo.Viewport.prototype.FocusOnXY = function (x, y) {
	this.SetPosition( Math.round(x - this.View.HalfWidth ), Math.round( y - this.View.HalfHeight ) );
	return this;
};




/*
 * SetPosition
 * @public
*/
Duedo.Viewport.prototype.SetPosition = function (x, y) {

	this.View.Location.X = x;
	this.View.Location.Y = y;

	if( this.Bounds )
	{
		this.UpdateBoundsCollision();
	}


	return this;

};



/*
 * Intersects
 * @public
 * Check object intersection
*/
Duedo.Viewport.prototype.Intersects = function ( DuedoRect ) {
	/*
		Rectangle intersection
	*/
	return this.View.Intersects(DuedoRect)
};




/*
 * Attach
 * @public
 * Make an object fixed to viewport
 * @gobject: the graphic object
 * @offsetVetor: (Duedo.Vector2) the camera offset
*/
Duedo.Viewport.prototype.Attach = function ( gobj, offsetVector ) {

	if( !Duedo.Utils.IsNull(gobj) )
	{
		gobj.FixedToViewport = true;
		gobj.ViewportOffset  = offsetVector;
	}

	return gobject;

};



/*
 * Detach
 * @public
 * Free an object from the camera. The gobj will no longer follow
 * the camera translation
*/
Duedo.Viewport.prototype.Detach = function ( gobj ) {

	if( !Duedo.Utils.IsNull(gobj) )
	{
		gobj.FixedToViewport = false;
	}

	return gobj;
};


/*
 * Animate
 * @public
 * Animate the View
*/
Duedo.Viewport.prototype.Animate = function ( AffectedProperties, Duration, Tweening, name ) {
	return this.View.Animate(AffectedProperties, Duration, Tweening, name);
};



/*
 * Zoom
 * @public
 * Manage Zoom property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Zoom", {

	set: function ( value ) {
		
		this._Zoom = value;
		
		// Allow only 1 (Rendrer.this.Context.scale(Zoom))
		if(this._Zoom < this.ZoomMin) {
			this._Zoom = this.ZoomMin;
		}

		if(this._Zoom > this.ZoomMax) {
			this._Zoom = this.ZoomMax;
		}

		this.Game._Message('zoomed');
		this._Zoomed = true;
	},

	get: function () {
		return this._Zoom;
	}

});


/*
 * Bottom
 * @public
 * Return bottom point in meters
*/
Object.defineProperty(Duedo.Viewport.prototype, "Bottom", {

	get: function () {
		return this.View.Height;
	}

});


/*
 * Width
 * @public
 * Manage Width property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Width", {

	set: function ( value ) {
		this.View.Width = value;
		//TODO fix MODIFICA SCALE
	},

	get: function () {
		return this.View.Width;
	}

});



/*
 * Height
 * @public
 * Manage Height property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Height", {

	set: function (value) {
		this.View.Height = value;
		//TODO fix MODIFICA SCALE
	},

	get: function () {
		return this.View.Height;
	}

});



/*
 * HalfWidth
 * @public
*/
Object.defineProperty(Duedo.Viewport.prototype, "HalfWidth", {

	get: function () {
		return this.View.Width / 2;
	}

});



/*
 * HalfHeight
 * @public
*/
Object.defineProperty(Duedo.Viewport.prototype, "HalfHeight", {
	get: function () {
		return this.View.Height / 2;
	}

});


/*
 * LocationInMeters
 * @public
 * Return location in meters
*/
Object.defineProperty(Duedo.Viewport.prototype, "LocationInMeters", {

	get: function () {
		return new Duedo.Vector2(this.View.Location.X * Duedo.Conf.PixelsInMeter, this.View.Location.Y * Duedo.Conf.PixelsInMeter)
	}

});



/*
 * Center
 * @public
 * Return the viewport location center
*/
Object.defineProperty(Duedo.Viewport.prototype, "Center", {

	get: function() {
		return new Duedo.Vector2( this.View.Location.X + (this.HalfWidth), this.View.Location.Y + (this.View.HalfHeight));
	},

});



/*
 * EnableDragging
 * @public
 * Makes the viewport draggable
*/
Object.defineProperty(Duedo.Viewport.prototype, "EnableDragging", {

	get: function() {
		return this._Draggable;
	},

	set: function(value) {
		this._Draggable = value;
	}

});



/*
 * Debug
 * @public
 * If setted to true will print debug informations
*/
Object.defineProperty(Duedo.Viewport.prototype, "Debug", {

	get: function() {
		return this._Debug;
	},

	set: function(bool) {

		if(bool === true)
		{
			this._Debug = true;

			if(this._DebugText)
				return;

			/*Prepare a text object through which view the informations*/
			this._DebugText = new Duedo.Text(this.Game, "VIEWPORT-DEBUG");
			this._DebugText.FixedToViewport = true;
			this._DebugText.FontSize = 14;
			this._DebugText.Style.Fill = 'red';
			this._DebugText.Anchor.X = this._DebugText.Anchor.Y = 0;
			this._DebugText.Debug = true;
			this._DebugText.ViewportOffset.X = 5;
			this._DebugText.ViewportOffset.Y = 15;
			this._DebugText.FontWeight = "bold";
			this._DebugText.Draggable = true;

			/*Add to debug storage for updates*/
			this.Game.Add(this._DebugText);
			
		}
		else
		{
			this._Debug = false;
			if(this._DebugText)
				this._DebugText.InUse = false;
		}
	}

});




/*
 * RenderDebugInfo
 * @public
 * Render debug information about the viewport
*/
Duedo.Viewport.prototype.RenderDebugInfo = function(renderer) {

	/*Debug info text*/
	this._DebugText.Text = "VIEWPORT-DEBUG\nLocation: {X: "+this.View.Location.X.toFixed(2)+" Y: "+this.View.Location.Y.toFixed(2)+"}\nDimension: {Width: "+this.View.Width+" Height: "+this.View.Height+"}\nBounds: {Width: "+this.Bounds.Width+" Height:    "+this.Bounds.Height+"}\nTranslation: {X:"+this.Translation.X.toFixed(2)+" Y:"+this.Translation.Y.toFixed(2)+"}\nZoom:" + this.Zoom;
	this._DebugText.Draw(this.Game.Renderer.Context);

	this._DebugText.RenderOrderID = renderer.CurrentRenderOrderID++;
};

/*
==============================
Duedo.World
Author: http://www.edoardocasella.it
==============================
*/

Duedo.World = function ( gameContext, WWMaxX, WWMaxY ) {
    this.Game = gameContext || Duedo.Global.Games[0];
    Duedo.GraphicObject.call(this);

    this.Type = Duedo.WORLD;
    this.Bounds;

    this._init(gameContext, WWMaxX, WWMaxY);
};



/*Inherit generic object*/
Duedo.World.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.World.prototype.constructor = Duedo.World;



/*
 * _init
 * @private
*/
Duedo.World.prototype._init = function (game, WWMaxX, WWMaxY) {
    this._super();

    /*Create world bounds*/
    this.Bounds = new Duedo.Rectangle(
        new Duedo.Vector2(0, 0), 
        WWMaxX || this.Game.Renderer.Canvas.width, 
        WWMaxY || this.Game.Renderer.Canvas.height
    );


    
    return this;

};




/*
 * Update
 * @public
*/
Duedo.World.prototype.Update = function (deltaT) {

    /*"This" animations*/
    this.UpdateAnimations(deltaT);
    
    return this;

};




/*
 * Center
*/
Object.defineProperty(Duedo.World.prototype, "Center" , {

    get: function() {
        return new Duedo.Vector2(this.Bounds.Width / 2, this.Bounds.Height / 2);
    },

});



/*
 * RandomX
*/
Object.defineProperty(Duedo.World.prototype, "RandomX", {

    get: function() {
        return Duedo.Utils.RandInRange(0, this.Bounds.Width);
    }

});



/*
 * RandomY
*/
Object.defineProperty(Duedo.World.prototype, "RandomY", {

    get: function() {
        return Duedo.Utils.RandInRange(0, this.Bounds.Height);
    }

});



/*
 * RandomVector2
*/
Object.defineProperty(Duedo.World.prototype, "RandomVector2", {

    get: function() {
        return new Duedo.Vector2(this.RandomX, this.RandomY);
    }

});


/*
 * World width
*/
Object.defineProperty(Duedo.World.prototype, "Width", {

    get: function () {
        return this.Bounds.Width;
    }

});


/*
 * World height
*/
Object.defineProperty(Duedo.World.prototype, "Height", {

    get: function () {
        return this.Bounds.Height;
    }

});




























/*
==============================
Duedo.Renderer
Author: http://www.edoardocasella.it
Main rendering class, cycle and draw all the game elements in the buffer
Notes:
//Controlla per note: PreRender()
==============================
*/

/*
 * Duedo supported renderers
*/
Duedo.Renderers = {
	CANVAS: 1,
	WEBGL: 2
}


Duedo.Renderer = function( gameContext, canvas, renderer) {

	this.Game;
	this.Buffer = [];
	this._Cache = {};

	/*Canvas2d*/
	this.Canvas;
	this.Context;
	
	/*Generic*/
	this.FillColor = "rgba(0, 0, 0, 1)";
	this.Alpha;
	this.TransformationMatrix;
	this._Angle = 0;
	this.ClearBeforeRender = true;
	
	/*Smoothing*/
	this.SmoothProperty;
	this._EnableSmoothing = false;
	
	/*Blend mode*/
	this.CurrenBlendMode = null;
	this.BlendModesEnabled = false;
	
	/*Sorting*/
	this.SortPlanes;
	this._LastPlane;
	this.Sorting = {
		SortBy: "Z",
		OrderType: "descending",
		MaxZPlane: 0,
		MinZPlane: 0
	};

	this._RenderingList = [];

	/*important*/
	this.CurrentRenderOrderID = 0;


	this._init(gameContext, canvas, renderer);

};


/*Constructor*/
Duedo.Renderer.prototype.constructor = Duedo.Renderer;


/*Canvas BlendModes*/
Duedo.BlendModes = {
	NORMAL:      null,
	ADD:         null,
	MULTIPLY:    null,
	SCREEN:      null,
	OVERLAY:     null,
	DARKEN:      null,
	LIGHTER:     null,
	COLOR_DODGE: null,
	COLOR_BURN:  null,
	HARD_LIGHT:  null,
	SOFT_LIGHT:  null,
	DIFFERENCE:  null,
	EXCLUSION:   null,
	HUE:         null,
	SATURATION:  null,
	COLOR:       null,
	LUMINOSITY:  null
};



/*
 * _init
*/
Duedo.Renderer.prototype._init = function(gameContext, canvas, renderer) {

	if(!Duedo.Utils.IsNull(gameContext))
	{
		this.Game = gameContext || Duedo.Global.Games[0];
	}
	else
	{
		throw "Duedo.Renderer._init: gameContext is undefined";
	}

	if(!Duedo.Utils.IsNull(canvas))
	{
		if(canvas.nodeName.toLowerCase() == 'canvas')
			this.Canvas = canvas;
		else
		{
			throw "Dued.Renderer._init: needs a canvas node";
		}
	}
	else
	{
		throw "Duedo.Renderer._init: destination canvas is undefined";
	}

	if(!this.Canvas.getContext)
	{
		throw "Duedo.Renderer: your browser does not support the canvas rendering";
	}

	/*Instantiate context2d*/
	this.Context = this.Canvas.getContext("2d");

	/*Init std configuration*/
	this.TransformationMatrix = [1, 0, 0, 1, 0, 0];
	this.Alpha                = 1;
	this.SortPlanes           = true;

	
	//Renderer type
	if(Duedo.Utils.IsNull(renderer) || renderer !== "canvas" && renderer !== "webgl")
	{
		this.RendererType = "canvas";
	}
	else 
	{
		this.RendererType = renderer;
	}
		

	/*SmoothProperty*/
	if("imageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "imageSmoothingEnabled";
	else if("webkitImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "webkitImageSmoothingEnabled";
	else if("mozImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "mozImageSmoothingEnabled";
	else if("oImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "oImageSmoothingEnabled";
	else
		this.SmoothProperty = null;

	/*Check blend modes support*/
	this._PrepareBlendModes();

};



/*
 * PreRender
*/
Duedo.Renderer.prototype.PreRender = function(sort) {

	/*Check whether it is necessary to sort the objects by Z*/
	if(this.SortPlanes || sort === true) {
		this.SortBuffer();
		this.SortPlanes = false;
	}

	return this;

};



Duedo.Renderer.prototype.SortBuffer = function() {
	this.SortList(this.Buffer, this.Sorting.OrderType);
	this._Cache["_RequestMinMaxUpdate"] = true;
};


/*
 * Render
 * Main rendering loop
*/
Duedo.Renderer.prototype.Render = function() {

	/*Transform and scale*/
	this.SetTransformationMatrix();

	if(this.Game.Viewport.Zoom) {
		this.Context.scale(this.Game.Viewport.Zoom, this.Game.Viewport.Zoom);
	}

	/*Translate by viewport/camera*/
	this.Translate(
		-(this.Game.Viewport.Offset.X * Duedo.Conf.PixelsInMeter)/* * this.Game.Viewport.Zoom*/,
		-(this.Game.Viewport.Offset.Y * Duedo.Conf.PixelsInMeter)/* * this.Game.Viewport.Zoom*/
	);

	/*Clear*/
	if(this.ClearBeforeRender) 
		this.Clear();

	this.SortBuffer(); /*each cycle? :( */
	
	this._RenderGraphics(this.Buffer, this.Context);
	
	/*Render additional graphics from the current state*/
	this.Game.StateManager.RenderState(this.Context);

	return this;

};



var ok = 0;
/*
 * _RenderGraphics
 * Render all the graphics objects
*/
Duedo.Renderer.prototype._RenderGraphics = function (collection, context, pstate) {

	//Cycle
	var lng = collection.length - 1;
	
	while ((child = collection[lng--]) != null) {
		
		if (child.ParentState != this.Game.StateManager.CurrentState()
			&& child.ParentState != -1 && pstate != -1
			|| !child["Draw"])
			continue;

		/*Mem render order id*/
		child.RenderOrderID = this.CurrentRenderOrderID++;
		/*Render the parent graphic object*/
		child.Draw(context);
		/*Update min and max */
		if (this._Cache["_RequestMinMaxUpdate"])
			this._UpdateMinMaxPlane(child);

		/*Render sub-children*/
		if (Duedo.IsArray(child.ChildrenList.List)) {
			this._RenderGraphics(child.ChildrenList.List, context, -1);
		}
	}

};




/*
 * _UpdateMinMaxPlane
 * @private
 * Update the min and max Z plane value
*/
Duedo.Renderer.prototype._UpdateMinMaxPlane = function (child) {

	if (child.Z > this.Sorting.MaxZPlane)
		this._Cache["MaxZPlane"] = child.Z;
	if (child.Z < this.Sorting.MinZPlane)
		this._Cache["MinZPlane"] = child.Z;

};




/*
 * PostRender
 * @public
 * Draws things that should always be in the foreground, like debug info etc...
*/
Duedo.Renderer.prototype.PostRender = function() { 

	/*!Reset render order id counter*/
	this.CurrentRenderOrderID = 0;

	/*Render debug informations*/
	if(this.Game.Debug)
		this._RenderDebug();

	/*No more MinMaxUpdate til the next entity*/
	if (this._Cache["_RequestMinMaxUpdate"]) {
		this._Cache["_RequestMinMaxUpdate"] = false;
	}

	/*Render FPS*/
	if (this.Game._Cache["FPS"])
		this.Game._Cache["FPS"].Text = "FPS: " + this.Game.FPS().toFixed(2);

	//Empty buffer array
	this.Buffer = [];
};



/*
 * _RenderDebugInfo
 * @private
 * Render debug informations about viewport etc...
*/
Duedo.Renderer.prototype._RenderDebug = function() {

	/*Viewport debug info*/
	if(this.Game.Viewport.Debug)
	{
		this.Game.Viewport.RenderDebugInfo(this);
	}
	//PhysicsEngine
	if(this.Game.PhysicsEngine) {
		if(this.Game.PhysicsEngine.Debug) 
		{
			this.Game.PhysicsEngine.RenderDebugInfo(this);
		}
	}
};



/*
 * RenderQuadTree
 * @public
 * Render a quad tree
*/
Duedo.Renderer.prototype.RenderQuadTree = function(qt) {
	if(qt.Type === Duedo.QUADTREE)
		Duedo.QuadTree.Draw(qt, this.Context);
};



/*
 * Translate
 * Translate context by x/y
*/
Duedo.Renderer.prototype.Translate = function(x, y) {
	this.Context.translate(x, y);
};



/*
 * SetTransformationMatrix
 *
*/
Duedo.Renderer.prototype.SetTransformationMatrix = function() {
	
	this.Context.setTransform(
		this.TransformationMatrix[0],
		this.TransformationMatrix[1],
		this.TransformationMatrix[2],
		this.TransformationMatrix[3],
		this.TransformationMatrix[4],
		this.TransformationMatrix[5]
	);
};



/*
Object.defineProperty(Duedo.Renderer.prototype, "Rotation", {
	set: function (rad) {
		this.Context.rotate(rad);
	}
});
*/


/*
 * SortPlanesBy
 * Sort objects by this.SortPlanesBy property
*/
Duedo.Renderer.prototype.SortList = function(list, orderType) {

	if(orderType === "ascending" || Duedo.Utils.IsNull(orderType))
	{   
	   return Duedo.Utils.SortArrayAscending(list, this.Sorting.SortBy);
	}
	else if(orderType === "descending")
	{
		return Duedo.Utils.SortArrayDescending(list, this.Sorting.SortBy);
	}

};



/*
 * MaxZPlane
 * @public
 * Return max z plane
*/
Object.defineProperty(Duedo.Renderer.prototype, "MaxZPlane", {

	get: function () {
		return this._Cache["MaxZPlane"];
	}

});



/*
 * MinZPlane
 * @public
 * Return min z plane
*/
Object.defineProperty(Duedo.Renderer.prototype, "MinZPlane", {

	get: function () {
		return this._Cache["MinZPlane"];
	}

});



/*
 * Clear
*/
Duedo.Renderer.prototype.Clear = function() {

	if( this.FillColor )
	{
		this.Context.fillStyle = this.FillColor;
		this.Context.fillRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}
	else
	{
		this.Context.clearRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}

};



/*
 * _PrepareBlendModes
 * Check support for blend modes
*/
Duedo.Renderer.prototype._PrepareBlendModes = function () {

	/*Check blend modes support*/
	if (Duedo.Utils.Can.BlendModes()) {
		this.BlendModesEnabled = true;
		Duedo.BlendModes.NORMAL = "source-over";
		Duedo.BlendModes.ADD = "lighter";
		Duedo.BlendModes.MULTIPLY = "multiply";
		Duedo.BlendModes.SCREEN = "screen";
		Duedo.BlendModes.OVERLAY = "overlay";
		Duedo.BlendModes.DARKEN = "darken";
		Duedo.BlendModes.LIGHTER = "lighter";
		Duedo.BlendModes.COLOR_DODGE = "color-dodge";
		Duedo.BlendModes.COLOR_BURN = "color-burn";
		Duedo.BlendModes.HARD_LIGHT = "hard-light";
		Duedo.BlendModes.SOFT_LIGHT = "soft-light";
		Duedo.BlendModes.DIFFERENCE = "difference";
		Duedo.BlendModes.EXCLUSION = "exclusion";
		Duedo.BlendModes.HUE = "hue";
		Duedo.BlendModes.SATURATION = "saturation";
		Duedo.BlendModes.COLOR = "color";
		Duedo.BlendModes.LUMINOSITY = "luminosity";
	}
	else {
		Duedo.BlendModes.NORMAL = "source-over";
		Duedo.BlendModes.ADD = "lighter";
		Duedo.BlendModes.MULTIPLY = "source-over";
		Duedo.BlendModes.SCREEN = "source-over";
		Duedo.BlendModes.OVERLAY = "source-over";
		Duedo.BlendModes.DARKEN = "source-over";
		Duedo.BlendModes.LIGHTER = "source-over";
		Duedo.BlendModes.COLOR_DODGE = "source-over";
		Duedo.BlendModes.COLOR_BURN = "source-over";
		Duedo.BlendModes.HARD_LIGHT = "source-over";
		Duedo.BlendModes.SOFT_LIGHT = "source-over";
		Duedo.BlendModes.DIFFERENCE = "source-over";
		Duedo.BlendModes.EXCLUSION = "source-over";
		Duedo.BlendModes.HUE = "source-over";
		Duedo.BlendModes.SATURATION = "source-over";
		Duedo.BlendModes.COLOR = "source-over";
		Duedo.BlendModes.LUMINOSITY = "source-over";
	}

	return this;

};



/*
 * EnableSmoothing
*/
Object.defineProperty(Duedo.Renderer.prototype, "EnableSmoothing", {
	
	set:function(value) {

		if(!Duedo.Utils.IsNull(this.SmoothProperty))
		{
			this.Context[this.SmoothProperty] = /*bool*/ value;
			this._EnableSmoothing = value;
		}
		
	},

	get: function() {
		return this._EnableSmoothing;
	}
});




/*
 * BlendMode
 * Set gloabalCompositeOperation
*/
Object.defineProperty(Duedo.Renderer.prototype, "BlendMode", {
	
	get: function() {
		return this.Context.globalCompositeOperation;
	},

	set: function(value) {
		this.Context.globalCompositeOperation = value;
	}

});



/*
 * Center
 * Get canvas center
*/
Object.defineProperty(Duedo.Renderer.prototype, "ViewCenter", {
	
	get:function() {
		return new Duedo.Vector2(this.Canvas.width / 2, this.Canvas.height / 2);
	}

});




/*
 * Scale
 * ws: width scale
 * hs: height scale
*/
Duedo.Renderer.prototype.Scale = function(ws, hs) {
	this.TransformationMatrix[0] = ws;
	this.TransformationMatrix[3] = hs;
};
/*
==============================
Duedo.GameContext
Author: http://www.edoardocasella.it

Notes:
Manage all the core objects, calculate deltaTime, update and render the game

Exposed objects:
Viewport
InputManager (Keyboard...)
StateManager
SoundManager
Loader
Cache
Time
...
==============================
*/


/*Global*/
Duedo.Global = {
    //Game instances
    Games: [],
    Id: 0,
    PreviousEntity: null
};


/*Next id*/
Duedo.NextId = function() {
    return ++Duedo.Global.Id;
};



/* GameContext
 * @canvas:       destination canvas (as node element)
 * @WWMinX:       world min x 
 * @WWMinY:       world min y
 * @WWMaxX        world max x
 * @WWMaxY        world max y
 * @enablePhysics (bool) request a physics world
 * @RendererType: canvas or webgl
 *
 *
 * >>> IMPORTANT: this engine works with METERS <<<
*/
Duedo.GameContext = function (canvas, WWMaxX, WWMaxY, bool_enablePhysics, rendererType) {
    this._Cache = {};

    this.Status = {
        HoveringObject: false, // TODO usa per mostrare il cursore giusto
        DraggingObject: false,
        HookedObject: false
    }

    this._Messages = {};

    // Canvas reference
    this.Canvas = null;

    //GameContext
    this.Renderer;
    this.Loader;
    this.Cache;
    this.World;
    this.SoundManager;
    this.StateManager;
    this.SpeechRecognition;
    this.Viewport;
    /*Camera: viewport reference*/
    this.Camera;
    this.Events;
    this.Time;
    this.Input;
    this.InputManager;
    this.Stage;
    this.Entities;
    this.PhysicsEngine;

    /*Debug informations update and render*/
    this.DebugStorage; // ! da rimuovere

    /*1.0 is one second*/
    this.DeltaT;
    this.MaxDeltaT = 1;
    this.MinDeltaT = 0.0001; 
    this.Tick      = 0;
    this.ElapsedTime;
    
    /*Space scale*/
    this.SpaceScale = Duedo.Conf.PixelsInMeter; //pixels in a meter
    if(!this.SpaceScale) {
        throw "Error: you must specify a relationship between pixels and meters";
    }
    
    /*Core loop properties*/
    this._Running = true;
    this._LoopID = null;
    this.__Booted = false;
    this.TimeoutLoop = null;

    this._ClientInfoInitialized = false;

    this._IsMobile = false;

    // Breakpoints
    this._Breakpoints = null;
    /*
    {
        1200: {
            Width: 1000
        },
        1400: {
            Width: 1200
        },
		600: {
            Width: 430,
            Height: 800
        }
	};
    */
    this._CurrentBreakpoint = null;

    //Setup
    this._Boot(canvas, WWMaxX, WWMaxY, bool_enablePhysics, rendererType);
};

/* Constructor */
Duedo.GameContext.prototype.constructor = Duedo.GameContext;


/*
 * _Boot
 * @private
 * Initialize all the core objects
*/
Duedo.GameContext.prototype._Boot = function ( canvas, WWMaxX, WWMaxY, bool_enablePhysics, renderer ) {
    
    var scope = this;
    var Browser;
    
    Duedo.Global.Games.push(this);

    /*Entities*/
    this.Entities = [];
    /*Time/Tick*/
    this.ElapsedTime = 0;
    this.DeltaT      = 0;
    this.Tick        = 0;

    this.Canvas = canvas;

    //Instantiate time manager, start counting
    this.Time = new Duedo.Time(true);
    /*New cache*/
    this.Cache = new Duedo.Cache(this);
    //Instantiate a new Loader
    this.Loader = new Duedo.Loader(this, this.Cache);
    /*Prepare requestAnimationFrame*/
    this.UseRequestAnimationFrame();
    /*Renderer*/
    this.__NewRenderer(Duedo.Null(renderer) ? Duedo.Renderers.CANVAS : renderer, canvas);
    /*Instantiate a state manager*/
    this.StateManager = new Duedo.StateManager(this);
    /*Input manager*/
    this.InputManager = new Duedo.InputManager(this);
    /*Interactivity manager*/
    this.InteractivityManager = this.InputManager.InteractivityManager;
    /*Events manager*/
    this.Events = new Duedo.Events(this);
    //Instantiate a new SoundManager
    this.SoundManager = new Duedo.SoundManager(this);
    //Create an initial basic world and a viewport
    this.World = new Duedo.World(this, WWMaxX, WWMaxY);
    //Create Viewport
    this.Camera = this.Viewport = new Duedo.Viewport(this, this.Renderer.Canvas.width, this.Renderer.Canvas.height);
    //Stage
    this.Stage = new Duedo.Stage(this);
    /*Instantiate physics engine*/
    if(bool_enablePhysics === true) {
        this.PhysicsEngine = new Duedo.PhysicsEngine(this);
    }

    /*Currently running*/
    this._Paused = false;

    /*Start looping*/
    if(Duedo.Conf.AutoLooping)    
    {
        this.__RunTicks();
    }
    else
    {
        //otherwise you have to do this manually
        //using your own custom looping function that calls MyGame.Simulate(game, deltatime)
    }

    this.StartBreakpointsListener();
    this._StartMobileCheck();

    this.__Booted = true;
    this._PostBoot();
    return this;
};



/*
 * __initRenderer
 * @private
 * Initialize renderer component
*/
Duedo.GameContext.prototype.__NewRenderer = function(r, c) {

    if(Duedo.Utils.AreNull([r, c]))
        throw "GameContext:__initRenderer: error while initializing renderer component. Missing canvas?";
    
    /*Renderer, canvas | webgl*/
    this.Renderer = new Duedo.Renderer(this, c, r);

    return this;
};



/**
 * _StartMobileCheck
 * void
 */
Duedo.GameContext.prototype._StartMobileCheck = function() {
    const checkDevice = () => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        this._IsMobile = check;
    }
    window.addEventListener('resize', checkDevice);
    checkDevice();
}



/**
 * StartBreakpointsListener
 * @returns 
 */
Duedo.GameContext.prototype.StartBreakpointsListener = function() {

    if(!this._Breakpoints) {
        return false;
    }

    const wCheck = () => {
        const windowWidth = this.IsMobile ? window.screen.width : document.body.clientWidth;
        const breakpointKeys = Object.keys(this._Breakpoints);
        for(let i = 0; i <= breakpointKeys.length; i++) {
            const sizeKey = breakpointKeys[i];
            if(windowWidth < sizeKey) {
                if(this._CurrentBreakpoint === sizeKey && this._CurrentBreakpoint != null) {
                    break;
                } else {
                    this._CurrentBreakpoint = sizeKey;
                    this._ResizeCanvas(
                        this.Breakpoints[sizeKey].hasOwnProperty('Width') ? this.Breakpoints[sizeKey].Width : this.Renderer.Canvas.width, 
                        this.Breakpoints[sizeKey].hasOwnProperty('Height') ? this.Breakpoints[sizeKey].Height : this.Renderer.Canvas.height);
                    break;
                }
            }
        }
    }
    wCheck();
    window.addEventListener('resize', () => {
        wCheck.call(this);
    });
}



/**
 * _Message
 * Use to exchange messages between core components
 * @param {*} messageString 
 * @param {*} value 
 * @returns 
 */
Duedo.GameContext.prototype._Message = function(messageString, value = true) {
    this._Messages[messageString] = value;
    return this;
}



/**
 * _ReadMessage
 * @param {*} messageString 
 * @param {*} value 
 * @returns 
 */
Duedo.GameContext.prototype._ReadMessage = function(messageString) {
    const exists = this._Messages.hasOwnProperty(messageString);
    if(exists) {
        delete this._Messages[messageString];
        return true;
    } else {
        return false;
    }
}



/**
 * _ResizeCanvas
 * @param {*} width 
 * @param {*} height 
 */
Duedo.GameContext.prototype._ResizeCanvas = function(width, height) {
    this.Renderer.Canvas.width = width;
    this.Renderer.Canvas.height = height;
    // Reset viewport
    this.Viewport.Reset(width, height);
}



/*
 * Reboot the main core
 * @param then: function to execute after reboot 
*/
Duedo.GameContext.prototype.Reboot = function (then) {

    var g = this;

    if(g.__Booted)
        g._Boot(
            g.Renderer.Canvas,
            g.World.Bounds.Width,
            g.World.Bounds.Height,
            g.PhysicsEngine.Enabled,
            g.Renderer.RendererType
        );


    if (Duedo.IsFunc(then))
        then.call();

    return this;
};



/*
 * _PostBoot
 * Read and exe options
*/
Duedo.GameContext.prototype._PostBoot = function () {

    /*Show FPS*/
    if (Duedo.Conf.DrawFPS) {
        var fpst = new Duedo.Text("FPS: -----");
        fpst.FixedToViewport = true;
        fpst.Style.Fill = "white";
        this._Cache["FPS"] = this.Add(fpst);
    }
};



/*
 * Add
 * @object: DUEDO object
 * Add an object to the currently running GameContext
*/
Duedo.GameContext.prototype.Add = function( object ) {

    if(Duedo.Utils.IsNull(object)){
        return null;
    }

    /*Internal info*/
    object.Id = Duedo.__GenNextObjID();
    object.ParentState = this.StateManager.CurrentState();

    /*Add into main stage*/
    if(Duedo.Null(object.ParentState)) 
        object.ParentState = -1; //omnipresent

    /*Push entity*/
    this.Entities.push(object);

    /*Object BornTime*/
    object.BornTime = this.ElapsedTime;

    /*Request to sort the planes by the Z index*/
    this.Renderer.SortPlanes = true;
    
    /*Call on stage add trigger*/
    if (!Duedo.Utils.IsNull(object["_CallTriggers"])) {
        object._CallTriggers("stageadd");
    }

    return object;

};

/*Just for order or convenience*/
Duedo.GameContext.prototype.AddEntity = Duedo.GameContext.prototype.Add;



/*
 * FPS
 * Calculate FPS
*/
Duedo.GameContext.prototype.FPS = function (dt) {
    if (Duedo.Utils.IsNull(dt))
        dt = this.DeltaT;
    return (1.0 / ((dt + dt) / 2.0));
};



/*
 * _Loop
 * private
 * Core auto main loop
*/
Duedo.GameContext.prototype.__RunTicks = function() {

    if( !this.Running ) 
        return;
    
    this.__Step();

    //Call next tick and mem the current LoopID
    this._LoopID = requestAnimationFrame(this.__RunTicks.bind(this));

};



/*
 * __Step
 * @private
 * Progress the game
*/
Duedo.GameContext.prototype.__Step = function() {

    /*Get deltaT - microseconds */
    var DeltaT = this.Time.Delta();

    if (Duedo.Null(DeltaT) || DeltaT < 0)
    {
        throw "Duedo.GameContext.__Step: deltaT is undefined or < 0";
    }

    /*Limit delta time*/
    this.DeltaT = DeltaT > this.MaxDeltaT ? this.MaxDeltaT : DeltaT;
    this.DeltaT = DeltaT < this.MinDeltaT ? this.MinDeltaT : DeltaT;
    
    try
    {
        this.ElapsedTime += this.DeltaT;
        this.Tick++;
        //ADD: this.tick, this.ElapsedTime: If we're exceeding the 32-bit?
    }
    catch (e)
    {
        throw "Error: " + e.message;
    }

    /*Update the game state*/
    this.Simulate(this, this.DeltaT);

};



/*
 * Simulate
 * @public
 * Game main loop - the beating heart
 * Set mygame.AutoLooping = false to write your own custom call of this function
 * @Game: an instance of Duedo.GameContext
 * @dt: delta time
*/
Duedo.GameContext.prototype.Simulate = function (Game, dt) {

        Game.InputManager.Update(dt);
        Game.StateManager.PreUpdate();
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.PreUpdate(dt);
        Game.Stage.PreUpdate(dt);
        Game.Viewport.PreUpdate();
        
        if (!Duedo.Utils.IsNull(Game.SpeechRecognition)) 
            Game.SpeechRecognition.Update(dt);
        
        Game.StateManager.UpdateState();
        Game.Events.Update(dt);
        Game.Stage.Update(dt);
        Game.World.Update(dt);
        Game.Viewport.Update(dt);
        Game.SoundManager.Update(dt);
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.Update(dt);

        Game.Stage.PostUpdate(dt);
        Game.InputManager.PostUpdate(dt);
        Game.Viewport.PostUpdate(dt);
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.PostUpdate(dt);

        Game.Renderer
            .PreRender()
            .Render()
            .PostRender();
            
};



/*
 * UseRequestAnimationFrame
 * Thanks to PIXI.js 
 * Get requestAnimationFrame function
 * IncludeS a polyfill of the API
*/
Duedo.GameContext.prototype.UseRequestAnimationFrame = function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) 
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    /*SetTimeout, POLYFILL*/
    if (!window.requestAnimationFrame) {

        var that = this;

        //Create a requestAnimationFrame-like function
        window.requestAnimationFrame = function (callback) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            
            that.TimeoutLoop = window.setTimeout(function() { 
                callback(currTime + timeToCall); 
            }, timeToCall);

            lastTime = currTime + timeToCall;
            
            return that.TimeoutLoop;
        };
    }

    if (!window.cancelAnimationFrame) 
    {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }


    window.requestAnimFrame = window.requestAnimationFrame;


};



/*
 * StopLooping
 * public
 * Stop core game loop
*/
Duedo.GameContext.prototype.StopLooping = function() {

    if(this.TimeoutLoop)
    {
        cancelAnimationFrame(this.TimeoutLoop);
    }
    else
    {
        cancelAnimationFrame(this._LoopID);
    }
    
    this.Running = false;
};
Duedo.GameContext.prototype.Stop = Duedo.GameContext.prototype.StopLooping;



/*
 * StartSpeechRecognition
 * Start using GOOGLE speech recognition
 * ? To add a voice command: mygame.SpeechRecognition.AddCommand("phrase", callback);
 * BETA
*/
Duedo.GameContext.prototype.StartSpeechRecognition = function ( autostart, onstart, onend  ) {
    
    this.SpeechRecognition = new Duedo.SpeechRecognition(autostart);
    
    if( !this.SpeechRecognition )
    {
        return false;
    }
    else
    {
        /*Init callbacks listeners*/
        if (onstart !== null && !Duedo.Null(onstart))
        {
            this.SpeechRecognition.Recognizer.onstart  = onstart  || null;
        }
        
        if (onend !== null && !Duedo.Null(onend))
        {
            this.SpeechRecognition.Recognizer.onend = onend || null;
        }
        
    }

    return this.SpeechRecognition;

};




/*
 * Running
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "Running", {

    get: function() {
        return this._Running;
    },

    set: function( value ) {
        this._Running = value;
    }

});



/*
 * Debug
 * @public
 * Start or stop debugging informations update and render
*/
Object.defineProperty(Duedo.GameContext.prototype, "Debug", {

    set: function(bool) {
        
        if(bool === true)
        {
            this.DebugStorage = new Duedo.DebugStorage(this);

        }
        else
        {
            this.DebugStorage.Clear();
            this.DebugStorage = null;
        } 
    },


    get: function() {
        return !Duedo.Utils.IsNull(this.DebugStorage);
    }

});



/*
 * Breakpoints
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "IsMobile", {

    get: function() {
        return this._IsMobile;
    },

});



/*
 * Breakpoints
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "Breakpoints", {

    get: function() {
        return this._Breakpoints;
    },

    set: function( value ) {
        this._Breakpoints = Object.keys(value).sort().reduce(
            (obj, key) => { 
              obj[key] = value[key];
              if(!obj[key].hasOwnProperty('Height')) {
                // If height is not specified, use always the original value
                obj[key].Height = this.Renderer.Canvas.height;
              }
              return obj;
            }, 
            {}
        );
        this.StartBreakpointsListener();
    }

});




/*
 * Cast
 * @public
 * Create an instance of a Duedo object (ex: Spritesheet, Rectangle, ParticleSystem etc...)
 * Game.Cast("Rectangle", new Duedo.Vector2(10, 10), 100, 100);
 *
 * OR apply a further collection of custom properties values:
 * Game.Create("Rectangle", new Duedo.Vector2(10, 10), 100, 100, {
    Z: 99,
    FillStyle: "rgba(255, 255, 255, 1)"
 });
 * PERCH� NON E' COMPLETA? 
 * Non tutti gli oggetti Duedo accettano il parametro GameContext, ma in molti � necessario
 * quindi � impossibile capire quali di questi hanno bisogno di un primo parametro game e quali no
 *
 * SOLUZIONE:
 * GLI OGGETTI CHE RICHIEDONO IL PARAMETRO GAME SONO QUELLI CHE HANNO UNA PROPRIETA' GameContext
 
Duedo.GameContext.prototype.Cast = function (constructor) {
    
    if (Duedo.Utils.IsNull(Duedo[constructor]))
        return null;
    else
    {
       
        delete arguments[0]; //constructor var

        var instance = null,
            proto_argslength = Duedo[constructor].length;
        
        //From object to array
        arguments = [].slice.call(arguments);
        
        var array_args = [];
        ar = arguments;
        for (var i in ar)
        {
            if (array_args.length <= proto_argslength)
            {
                array_args.push(ar[i]);
            }
            else
            {
                break;
            }
        }
        
        
        if ("Radius" in Duedo[constructor].prototype)
            alert();

        console.log(Duedo[constructor].constructor);
        //array_args.unshift(this);
        //Controlla se ha GameContext 

        function f() {
            return Duedo[constructor].apply(this, array_args);
        }
        
        f.prototype = Duedo[constructor].prototype;

        //Create a Duedo obj instance
        instance = new f();
        instance.Game = this;

        //Check for extra object properties
        for (var i in arguments)
            if (arguments[i] instanceof Object)
                for (var x in arguments[i]) {
                    instance[x] = arguments[i][x];
                    alert(x);
                }
        instance.Z = 1000;
        console.log(instance);
        this.Add(instance);
        return instance;
        
    }

};
*/

/*
==============================
Duedo.Debug.Storage
Author: http://www.edoardocasella.it
==============================
*/



Duedo.DebugStorage = function() {
	this.DebugInfoObjects = [];
}



/*
 * Add
 * @public
*/
Duedo.DebugStorage.prototype.Add = function( object ) {

	if(Duedo.Utils.IsNull(object))
	{
		return false;
	}


	this.DebugInfoObjects.push(object);

};



/*
 * PreUpdate
 * @public
*/
Duedo.DebugStorage.prototype.PreUpdate = function(dt) {

	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];

		if(!obj.InUse)
		{
			this.DebugInfoObjects.splice(i, 1);
			continue;
		}

		if(obj["PreUpdate"])
		{
			obj.PreUpdate(dt);
		}
	}

};



/*
 * Update
 * @public
*/
Duedo.DebugStorage.prototype.Update = function(dt){


	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];
		
		if(obj["Update"])
		{
			obj.Update(dt);
		}
	}


};



/*
 * PostUpdate
 * @public
*/
Duedo.DebugStorage.prototype.PostUpdate = function(dt) {

	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];
		
		if(obj["PostUpdate"])
		{
			obj.PostUpdate(dt);
		}
	}

};



/*
 * Clear
 * @public
 * Clear Debug.Storage info storage
*/
Duedo.DebugStorage.prototype.Clear = function() {

	for( var i in this.DebugInfoObjects)
	{
		delete this.DebugInfoObjects[i];
	}

};