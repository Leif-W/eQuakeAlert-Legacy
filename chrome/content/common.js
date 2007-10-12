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