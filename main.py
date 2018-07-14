import numpy

w1 = 0.2171294043719473 #numpy.random.randn()
w2 = 0.17060917370939727 #numpy.random.randn()
bias = -1.1727945652392069 #numpy.random.randn()
m1 = int(input("measure 1:  "))

data = 5

def sigmoid(x):
    return 1/(1 + numpy.exp(-x))

def neuron(m1, w1, bias):
    return sigmoid(m1 * w1 + bias)

def cost(prediction, target):
    return (prediction - target)**2

def slope(prediction, target):
    return (prediction - data)*2

prediction = neuron(m1, w1, bias)
diff = cost(prediction, data)
s = slope(prediction, data)

print('prediction: {}'.format(prediction))
print('diff: {}'.format(diff))
print('slope: {}'.format(s))

for i in range(1000):
    prediction = prediction - .1 * slope(prediction, data)
print(prediction)
