import matplotlib.pyplot as plt
import numpy as np
import math as math

def time_dilation(t0, v):
	return t0 / math.sqrt(1 - v*v)

x = [x * 0.01 for x in range(0,100)]
y = [time_dilation(1, v) for v in x]

plt.plot(x, y, color="red")
plt.grid()
plt.xlim([0, max(x)])
plt.ylim([1, math.floor(max(y))])
plt.xticks(np.arange(0, 1, step=0.1))
plt.yticks(np.arange(1, max(y)))
plt.title('Time dilation')
plt.xlabel('Velocity as a fraction of the speed of light')
plt.show()
plt.ylabel('Dilation')