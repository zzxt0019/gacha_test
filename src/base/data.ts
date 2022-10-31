const tuple2: Record<number, Record<string, [number, string]>> = {}

export function tuple2Enum(data: [number, string]) {
    tuple2[data[0]] ??= {}

    tuple2[data[0]][data[1]] ??= data
    return tuple2[data[0]][data[1]]
}

export function deepCopy(data: any[]) {
    let target: any = [];
    data.forEach((value, index) => {
        if (Array.isArray(value)) {
            target[index] = deepCopy(data[index]);
        } else {
            target[index] = value;
        }
    })
    return target;
}