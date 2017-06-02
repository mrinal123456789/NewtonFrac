var r_1 = {"x": 1, "y": 0};
//var r_2 = {"x": -0.5, "y": 0.866025};
//var r_3 = {"x": -0.5, "y": -0.866025};
var r_c1 = [255,0,0];
var r_c2 = [0,150,0];
var r_c3 = [0,0,255];

function newton(p, c)
{
	var num = multiply(subtract(p, subtract({"x":-0.5,"y":0}, c)), multiply(subtract(p, {"x":1,"y":0}),subtract(p, add({"x":-0.5,"y":0}, c))));
	var denom = subtract(subtract(scalar(multiply(p,p),3),{"x":0.75,"y":0}), multiply(c,c));
	return subtract(p, divide(num, denom));
	
	//let a = add({"x":-0.5,"y":0}, c);
	//let b = subtract({"x":-0.5,"y":0}, c);
	//var num = multiply(subtract(p, {"x":1,"y":0}), multiply(subtract(p,a),subtract(p,b)));
	//var denom = add(multiply(subtract(p,a),subtract(p,b)), add(multiply(subtract(p, {"x":1,"y":0}),subtract(p,b)),multiply(subtract(p, {"x":1,"y":0}),subtract(p,a))))
	
	//return subtract(p, divide(subtract(multiply(p,multiply(p,p)),{"x":1,"y":0}),scalar(multiply(p,p),3)))
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
	if (d.id == 10)
		postMessage({id: d.id, data: genFractalL(d.data[0],d.data[1],d.data[2],d.data[3],d.data[4],d.data[5],d.data[6],d.data[7])});
	else if (d.id == 20)
		postMessage({id: d.id, data: genFractalR(d.data[0],d.data[1],d.data[2],d.data[3],d.data[4],d.data[5],d.data[6],d.data[7])});
	close();
}

function genFractalL(c_w, c_h, w_x, w_y, w_w, w_h, max_res, imgData)
{
	var X_STEP = 2 * w_w / c_w;
	var Y_STEP = 2 * w_h / c_h
	var min_res = 0;//Math.floor(max_res * 0.1);
	
	for (var x = 0; x < c_w / 2; x++)//(var x = 0; x < c_w / 2; x++)
	{
		for (var y = 0; y < c_h; y++)//(var y = 0; y < c_h;y++)
		{
			var rPos = x * 4 + y * 4 * (c_w / 2);
			//imgData.data[rPos] = 255;
			//imgData.data[rPos + 1] = 0;
			//imgData.data[rPos + 2] = 0;
			//imgData.data[rPos + 3] = 255;
			var coordX = w_x - w_w + x * X_STEP;
			var coordY = w_y - w_h + y * Y_STEP;
			var c = new Array();
			c.x = coordX;
			c.y = coordY;
			var r_2 = add({"x":-0.5,"y":0}, c);
			var r_3 = subtract({"x":-0.5,"y":0}, c);
			var p0 = new Array();
			p0.x = 0.0;
			p0.y = 0.0;
			var iteration = 0;
			found = false;
			while (!found)
			{
				var p1 = p0;
				p0 = newton(p0, c);
				if (iteration > max_res)
				{
					/*var d1 = distanceSqr(p0, r_1);
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
					}*/
					imgData.data[rPos] = 34;
					imgData.data[rPos + 1] = 41;
					imgData.data[rPos + 2] = 42;
					imgData.data[rPos + 3] = 255;
					found = true;
				}
				else if (iteration > min_res && distanceSqr(p0, p1) < 0.0001)
				{
					var d1 = Math.sqrt(distanceSqr(p0, r_1));
					if (Math.abs(d1) < 0.00005)
					{
						//console.log(d1)
						imgData.data[rPos] = r_c1[0]
						imgData.data[rPos + 1] = r_c1[1];
						imgData.data[rPos + 2] = r_c1[2];
						imgData.data[rPos + 3] = 100 + 130 * (iteration - min_res) / (max_res - min_res);
						found = true;
					}
					var d2 = distanceSqr(p0, r_2);
					if (Math.abs(d2) < 0.00005)
					{
						imgData.data[rPos] = r_c2[0]
						imgData.data[rPos + 1] = r_c2[1];
						imgData.data[rPos + 2] = r_c2[2];
						imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
						found = true;
					}
					var d3 = distanceSqr(p0, r_3);
					if (Math.abs(d3) < 0.00005)
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
			//console.log(p0)
			//if (x % 10 == 0 && y == c_h - 1)
			//	postMessage({data:imgData});
		}
	}
	return imgData;
}


function genFractalR(c_w, c_h, w_x, w_y, w_w, w_h, max_res, imgData)
{
	var X_STEP = 2 * w_w / c_w;
	var Y_STEP = 2 * w_h / c_h
	var min_res = Math.floor(max_res * 0.1);
	for (var x = c_w - 1; x >= c_w / 2; x--)
	{
		for (var y = 0; y < c_h;y++)
		{
			var rPos = x * 4 + y * 4 * (c_w / 2);
			//imgData.data[rPos] = 255;
			//imgData.data[rPos + 1] = 0;
			//imgData.data[rPos + 2] = 0;
			//imgData.data[rPos + 3] = 255;
			var coordX = w_x - w_w + x * X_STEP;
			var coordY = w_y - w_h + y * Y_STEP;
			var c = new Array();
			c.x = coordX;
			c.y = coordY;
			var r_2 = add({"x":-0.5,"y":0}, c);
			var r_3 = subtract({"x":-0.5,"y":0}, c);
			var p0 = new Array();
			p0.x = 0.0;
			p0.y = 0.0;
			var iteration = 0;
			found = false;
			while (!found)
			{
				var p1 = p0;
				p0 = newton(p0, c);
				if (iteration > max_res)
				{
					/*var d1 = distanceSqr(p0, r_1);
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
					}*/
					imgData.data[rPos] = 34;
					imgData.data[rPos + 1] = 41;
					imgData.data[rPos + 2] = 42;
					imgData.data[rPos + 3] = 255;
					found = true;
				}
				else if (iteration > min_res && distanceSqr(p0, p1) < 0.0001)
				{
					var d1 = Math.sqrt(distanceSqr(p0, r_1));
					if (Math.abs(d1) < 0.00005)
					{
						//console.log(d1)
						imgData.data[rPos] = r_c1[0]
						imgData.data[rPos + 1] = r_c1[1];
						imgData.data[rPos + 2] = r_c1[2];
						imgData.data[rPos + 3] = 100 + 130 * (iteration - min_res) / (max_res - min_res);
						found = true;
					}
					var d2 = distanceSqr(p0, r_2);
					if (Math.abs(d2) < 0.00005)
					{
						imgData.data[rPos] = r_c2[0]
						imgData.data[rPos + 1] = r_c2[1];
						imgData.data[rPos + 2] = r_c2[2];
						imgData.data[rPos + 3] = 100 +  130 * (iteration - min_res) / (max_res - min_res);
						found = true;
					}
					var d3 = distanceSqr(p0, r_3);
					if (Math.abs(d3) < 0.00005)
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
			//if (x % 10 == 0 && y == c_h - 1)
			//	postMessage({data:imgData});
		}
	}
	return imgData;
}
