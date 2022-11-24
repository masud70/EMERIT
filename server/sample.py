import sys
# Since the usage behind this was to recommend products via a KNN function, the input is a product ID or ObjectID from MongoDB.
def readInput():
    lines = sys.argv[1]
    return str(lines)

def main():
    # product_in = readInput()
    ret = '1'
    ret = input()
    for i in range(0,10):
        ret = ret + " k "
    print(ret)

if __name__ == '__main__':
    main()


# //python addition
# var { spawn } = require('child_process');
# var id = 'Nishat1';
# let data1;
# // the second argument must be your the location to your .py
# var py_process = spawn('python', ['sample.py', id]);
# // whenever you send data to your python file it MUST be in a string format or python will not be able to interpret it.
# py_process.stdout.on('data', data => {
#     data1 = data.toString();
# });

# py_process.on('close', code => {
#     console.log('Code', code);
#     console.log(data1);
# });