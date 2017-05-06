var r_1 = {"x": 1, "y": 0};
var r_2 = {"x": -0.5, "y": 0.866025};
var r_3 = {"x": -0.5, "y": -0.866025};
var r_c1 = [255,0,0];
var r_c2 = [0,150,0];
var r_c3 = [0,0,255];

function newton(p)
{
	return subtract(p, divide(subtract(multiply(p,multiply(p,p)),{"x":1,"y":0}),scalar(multiply(p,p),3)))
}

function multiply(p1, p2)
{
	var temp = new Array();
	temp.x = p1.x * p2.x - p1.y * p2.y;
	temp.y = p1.x * p2.y + p1.y * p2.x;
	return temp;
}

function add(p1, p2)
{
	var temp = new Array();
	temp.x = p1.x + p2.x;
	temp.y = p1.y + p2.y;
	return temp;
}

function subtract(p1, p2)
{
	var temp = new Array();
	temp.x = p1.x - p2.x;
	temp.y = p1.y - p2.y;
	return temp;
}

function divide(p1, p2)
{
	var temp = new Array();
	temp.x = (p1.x * p2.x + p1.y * p2.y) / (p2.x * p2.x + p2.y * p2.y);
	temp.y = (p1.y * p2.x - p1.x * p2.y) / (p2.x * p2.x + p2.y * p2.y);
	return temp;
}

function scalar(p, c)
{
	var temp = new Array();
	temp.x = c * p.x;
	temp.y = c * p.y;
	return temp;
}

function distanceSqr(p1, p2)
{
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}
			

onmessage = function(msg)
{
	var d = msg.data;
	postMessage({id: d.id, data: genFractal(d.data[0],d.data[1],d.data[2],d.data[3],d.data[4],d.data[5],d.data[6],d.data[7])});
	close();
}

function genFractal(c_w, c_h, w_x, w_y, w_w, w_h, max_res, imgData)
{
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
			if (x % 10 == 0 && y == c_h - 1)
				postMessage({data:imgData});
		}
	}
	return imgData;
}