const static_enums: [][][] = []

export function getEnum(data: [number, string]) {
    if (!static_enums[data[0]]) {
        static_enums[data[0]] = [];
    }
    if (!(static_enums[data[0]] as [any][any]) [data[1]]) {
        (static_enums[data[0]] as [any][any])[data[1]] = data;
    }
    return (static_enums[data[0]] as [any][any])[data[1]]
}