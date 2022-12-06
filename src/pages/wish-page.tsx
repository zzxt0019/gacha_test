import {InputNumber, Layout, Select, Space} from "antd";
import {MustGetChart} from "../charts/must-get-chart";
import React from "react";
import {Weapon} from "../base/weapon";
import {tuple2Enum} from "../base/data";
import {Character} from "../base/character";

export function WishPage() {
    const [characterCurrent, setCharacterCurrent] = React.useState([0, 0]);
    const [weaponCurrent, setWeaponCurrent] = React.useState([0, 0]);
    const [characterState, setCharacterState] = React.useState([[0], [0]]);
    const [weaponState, setWeaponState] = React.useState([[0, 0], [0]]);
    const [simulateTimes, setSimulateTimes] = React.useState(20000);
    const [characterTargets,] = React.useState((() => {
        const map = new Map<[number, string], number>();
        map.set(tuple2Enum([5, 'up']), 1);
        return map;
    })());
    const [weaponTargets,] = React.useState(new Map<[number, string], number>());
    const [count, setCount] = React.useState(0)
    return (
        <div>
            <Layout>
                <Space>
                    <Select defaultValue={characterTargets.get(tuple2Enum([5, 'up'])) ?? 0}
                            onChange={(value: number) => {
                                characterTargets.set(tuple2Enum([5, 'up']), value);
                                setCount(count => count + 1);
                            }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c}
                                                                          value={c}>{c - 1}命5星</Select.Option>)}
                    </Select>
                    <Select defaultValue={weaponTargets.get(tuple2Enum([5, 'up'])) ?? 0}
                            onChange={(value: number) => {
                                weaponTargets.set(tuple2Enum([5, 'up']), value);
                                setCount(count => count + 1);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>{c}精5星</Select.Option>)}
                    </Select>
                    <Select defaultValue={characterTargets.get(tuple2Enum([4, 'up1'])) ?? 0}
                            onChange={(value: number) => {
                                characterTargets.set(tuple2Enum([4, 'up1']), value);
                                setCount(count => count + 1);
                            }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c}
                                                                          value={c}>{c - 1}命4星</Select.Option>)}
                    </Select>
                    <Select defaultValue={weaponTargets.get(tuple2Enum([4, 'up1'])) ?? 0}
                            onChange={(value: number) => {
                                weaponTargets.set(tuple2Enum([4, 'up1']), value);
                                setCount(count => count + 1);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>{c}精4星</Select.Option>)}
                    </Select>
                    角色池已垫:
                    <InputNumber defaultValue={0} onChange={(value: number | null) => {
                        if (value) {
                            setCharacterCurrent([value, 0]);
                            setCount(count => count + 1);
                        } else {
                            setCharacterCurrent([0, 0]);
                            setCount(count => count + 1);
                        }
                    }}></InputNumber>
                    <Select defaultValue={characterState[0][0]} onChange={(value: number) => {
                        setCharacterState([[value], characterState[1]])
                    }}>
                        <Select.Option value={0}>小保底</Select.Option>
                        <Select.Option value={1}>大保底</Select.Option>
                    </Select>
                    武器池已垫:
                    <InputNumber defaultValue={0} onChange={(value: number | null) => {
                        if (value) {
                            setWeaponCurrent([value, 0]);
                            setCount(count => count + 1);
                        } else {
                            setWeaponCurrent([0, 0]);
                            setCount(count => count + 1);
                        }
                    }}></InputNumber>
                    <Select defaultValue={weaponState[0][0]} onChange={(value: number) => {
                        setWeaponState([[value, weaponState[0][1]], weaponState[1]]);
                    }}>
                        <Select.Option value={0}>小保底</Select.Option>
                        <Select.Option value={1}>大保底</Select.Option>
                    </Select>
                    <Select defaultValue={weaponState[0][1]} onChange={(value: number) => {
                        weaponState[0][1] = value;
                        setWeaponState([[weaponState[0][0], value], weaponState[1]]);
                    }}>
                        <Select.Option value={0}>0定轨</Select.Option>
                        <Select.Option value={1}>1定轨</Select.Option>
                        <Select.Option value={2}>满定轨</Select.Option>
                    </Select>
                    模拟
                    <Select defaultValue={20000} onChange={(value: number) => {
                        setSimulateTimes(value)
                        setCount(count => count + 1);
                    }}>
                        <Select.Option value={20000}>20000</Select.Option>
                        <Select.Option value={50000}>50000</Select.Option>
                        <Select.Option value={100000}>100000</Select.Option>
                    </Select>
                    次
                </Space>
                <MustGetChart wish={[
                    {
                        baseWish: () => new Character(),
                        targets: characterTargets,
                        current: characterCurrent,
                        state: characterState,
                    },
                    {
                        baseWish: () => new Weapon(),
                        targets: weaponTargets,
                        current: weaponCurrent,
                        state: weaponState,
                    }
                ]} simulateTimes={simulateTimes} count={count}></MustGetChart>
            </Layout>
        </div>
    );
}