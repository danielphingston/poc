import multiprocessing
import time
import asyncio
    
def process(x):
    time.sleep(1)
    return x*x

async def asyncProcess(x):
    await asyncio.sleep(1)
    return x*x

def runSequence(input):
    start=time.time()
    output=[process(x) for x in input]
    end=time.time()
    print("Sequence: ",end-start)

def runParallel(input):
    pool=multiprocessing.Pool()
    start=time.time()
    output=pool.map(process,input)
    end=time.time()
    print("Parallel: ",end-start)

def runThreaded(input):
    pool=multiprocessing.pool.ThreadPool()
    start=time.time()
    output=pool.map(process,input)
    end=time.time()
    print("Threaded: ",end-start)

async def runAsync(input):
    start=time.time()
    output=await asyncio.gather(*(asyncProcess(i) for i in input))
    end=time.time()
    print("Async: ",end-start)


def main():
    input=[x for x in range(10)]
    runParallel(input)
    runThreaded(input)
    asyncio.run(runAsync(input))
    runSequence(input)

if __name__ == '__main__':
    main()
