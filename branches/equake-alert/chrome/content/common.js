function shakeIt(mag)
{
    if (mag>10) mag=10;
	if (mag<1) mag=1;
	x=12;
	y=8;
	for (i = 0; i <= x; i++) {
		for (c=0;c<mag;c++)
		{
			for (j = y; j > 0; j--) 
			{
	                self.moveBy(0,i);
	                self.moveBy(i,0);
	                self.moveBy(0,-i);
	                self.moveBy(-i,0);
	        }
		}
	}
}


function shakeItOld(mag){
 if (mag>10) mag=10;
 if (mag<1) mag=1;
for (i=0;i,i<25;i++){
window.moveBy(0,mag)
window.moveBy(mag,0)
window.moveBy(0,-mag)
window.moveBy(-mag,0)
}
}