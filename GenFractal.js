mode = -1;
var imgData = (c.getImageData(0,0,c_w, c_h));
var X_STEP = 2 * w_w / c_w;
var Y_STEP = 2 * w_h / c_h
var min_res = Math.floor(Math.pow(max_res, 2/3));
for (var x = 0; x < c_w; x++)
{
    for (var y = 0; y < c_h;y++)
    {
        var rPos = x * 4 + y * 4 * c_w;
        //imgData.data[rPos] = 255;
        //imgData.data[rPos + 1] = 0;
        //imgData.data[rPos + 2] = 0;
        //imgData.data[rPos + 3] = 255;
        var coordX = w_x - w_w + x * X_STEP;
        var coordY = w_y - w_h + y * Y_STEP;
        var p0 = new Array();
        p0.x = coordX;
        p0.y = coordY;
        var iteration = 0;
        found = false;
        while (!found)
        {
            p0 = newton(p0);
            if (iteration > max_res)
            {
                var d1 = distanceSqr(p0, r_1);
                var d2 = distanceSqr(p0, r_2);
                var d3 = distanceSqr(p0, r_3);
                if (d1 < d2 && d1 < d3)
                {
                    imgData.data[rPos] = r_c1[0]
                    imgData.data[rPos + 1] = r_c1[1];
                    imgData.data[rPos + 2] = r_c1[2];
                    imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
                }
                else if (d2 < d1 && d2 < d3)
                {
                    imgData.data[rPos] = r_c2[0]
                    imgData.data[rPos + 1] = r_c2[1];
                    imgData.data[rPos + 2] = r_c2[2];
                    imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
                }
                else
                {
                    imgData.data[rPos] = r_c3[0]
                    imgData.data[rPos + 1] = r_c3[1];
                    imgData.data[rPos + 2] = r_c3[2];
                    imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
                }
                found = true;
            }
            if (iteration > min_res)
            {
                var d1 = distanceSqr(p0, r_1);
                if (Math.abs(d1) < 0.125)
                {
                    imgData.data[rPos] = r_c1[0]
                    imgData.data[rPos + 1] = r_c1[1];
                    imgData.data[rPos + 2] = r_c1[2];
                    imgData.data[rPos + 3] = 100 + 130 * (iteration - min_res) / (max_res - min_res);
                    found = true;
                }
                var d2 = distanceSqr(p0, r_2);
                if (Math.abs(d2) < 0.125)
                {
                    imgData.data[rPos] = r_c2[0]
                    imgData.data[rPos + 1] = r_c2[1];
                    imgData.data[rPos + 2] = r_c2[2];
                    imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
                    found = true;
                }
                var d3 = distanceSqr(p0, r_3);
                if (Math.abs(d3) < 0.125)
                {
                    imgData.data[rPos] = r_c3[0]
                    imgData.data[rPos + 1] = r_c3[1];
                    imgData.data[rPos + 2] = r_c3[2];
                    imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
                    found = true;
                }
            }
            iteration++;
        }
        /*for (var i = 0; i < res; i++)
         {
         p0 = newton(p0)
         }
         var d1 = distanceSqr(p0, r_1);
         var d2 = distanceSqr(p0, r_2);
         var d3 = distanceSqr(p0, r_3);
         if (d1 < d2 && d1 < d3)
         {
         imgData.data[rPos] = r_c1[0];
         imgData.data[rPos + 1] = r_c1[1];
         imgData.data[rPos + 2] = r_c1[2];
         imgData.data[rPos + 3] = 255;
         }
         else if (d2 < d1 && d2 < d3)
         {
         //console.log("OTHER");
         imgData.data[rPos] = r_c2[0];
         imgData.data[rPos + 1] = r_c2[1];
         imgData.data[rPos + 2] = r_c2[2];
         imgData.data[rPos + 3] = 255;
         }
         else
         {
         //console.log("OTHER " + x + " " + y);
         imgData.data[rPos] = r_c3[0];
         imgData.data[rPos + 1] = r_c3[1];
         imgData.data[rPos + 2] = r_c3[2];
         imgData.data[rPos + 3] = 255;
         }*/
    }
}
c.putImageData(imgData, 0, 0);
console.log("done");
mode = 0;
