function shakeIt(mag)
{
x=12;
y=8;
    if (self.moveBy) {
	        for (i = 0; i <= x; i++) {
			for (c=0;c<mag/2;c++)
			{
			for (j = y; j > 0; j--) {
	                self.moveBy(0,i);
	                self.moveBy(i,0);
	                self.moveBy(0,-i);
	                self.moveBy(-i,0);
	            }
			}
	        }
    }
}