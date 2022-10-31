import {Input, InputNumber, Layout, Select, Space} from "antd";
import {MustGetChart} from "../charts/must-get-chart";
import React from "react";
import {Character} from "./character";
import {Weapon} from "./weapon";
import {getEnum} from "../base/data";

export function WishPage() {
    const [characterCurrent, setCharacterCurrent] = React.useState([0, 0]);
    const [weaponCurrent, setWeaponCurrent] = React.useState([0, 0]);
    const [characterState, setCharacterState] = React.useState(['small', 'other']);
    const [weaponState, setWeaponState] = React.useState(['small0', 'other']);
    const [simulateTimes, setSimulateTimes] = React.useState(20000);
    const [characterBingoTimes, setCharacterBingoTimes] = React.useState(new Map<[number, string], number>());
    const [weaponBingoTimes, setWeaponBingoTimes] = React.useState(new Map<[number, string], number>());
    const [refresh, setRefresh] = React.useState(false);
    return (
        <div>
            <Layout>
                <Space>
                    <Select defaultValue={characterBingoTimes.get(getEnum([5, 'up'])) ?? 0} onChange={(value: number) => {
                        characterBingoTimes.set(getEnum([5, 'up']), value);
                        setRefresh(!refresh);
                        // setCharacterBingoTimes(characterBingoTimes);
                    }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option value={c}>{c - 1}命5星</Select.Option>)}
                    </Select>
                    <Select defaultValue={weaponBingoTimes.get(getEnum([5, 'up'])) ?? 0}
                            onChange={(value: number) => {
                                weaponBingoTimes.set(getEnum([5, 'up']), value);
                                setRefresh(!refresh);
                                // setWeaponBingoTimes(weaponBingoTimes);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>{c}精5星</Select.Option>)}
                    </Select>
                    <Select defaultValue={characterBingoTimes.get(getEnum([4, 'up1'])) ?? 0} onChange={(value: number) => {
                        characterBingoTimes.set(getEnum([4, 'up1']), value);
                        setRefresh(!refresh);
                        // setCharacterBingoTimes(characterBingoTimes);
                    }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option value={c}>{c - 1}命4星</Select.Option>)}
                    </Select>
                    <Select defaultValue={weaponBingoTimes.get(getEnum([4, 'up1'])) ?? 0}
                            onChange={(value: number) => {
                                weaponBingoTimes.set(getEnum([4, 'up1']), value);
                                setRefresh(!refresh);
                                // setWeaponBingoTimes(weaponBingoTimes);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>{c}精4星</Select.Option>)}
                    </Select>
                    角色池已垫:
                    <InputNumber defaultValue={0} onChange={(value: number | null) => {
                        if (value) {
                            setCharacterCurrent([value, 0]);
                            setRefresh(!refresh);
                        } else {
                            setCharacterCurrent([0, 0]);
                            setRefresh(!refresh);
                        }
                    }}></InputNumber>
                    <Select defaultValue={characterState[0]} onChange={(value: string) => {
                        setCharacterState([value, characterState[1]])
                        setRefresh(!refresh);
                    }}>
                        <Select.Option value={'small'}>小保底</Select.Option>
                        <Select.Option value={'big'}>大保底</Select.Option>
                    </Select>
                    武器池已垫:
                    <InputNumber defaultValue={0} onChange={(value: number | null) => {
                        if (value) {
                            setWeaponCurrent([value, 0]);
                            setRefresh(!refresh);
                        } else {
                            setWeaponCurrent([0, 0]);
                            setRefresh(!refresh);
                        }
                    }}></InputNumber>
                    <Select defaultValue={weaponState[0]} onChange={(value: string) => {
                        setWeaponState([value, weaponState[1]]);
                        setRefresh(!refresh);
                    }}>
                        <Select.Option value={'small0'}>小保底</Select.Option>
                        <Select.Option value={'small1'}>定轨1小保底</Select.Option>
                        <Select.Option value={'big'}>定轨1大保底</Select.Option>
                        <Select.Option value={'ding-gui'}>定轨2</Select.Option>
                    </Select>
                    模拟
                    <Select defaultValue={20000} onChange={(value: number) => {
                        setSimulateTimes(value)
                    }}>
                        <Select.Option value={20000}>20000</Select.Option>
                        <Select.Option value={50000}>50000</Select.Option>
                        <Select.Option value={100000}>100000</Select.Option>
                    </Select>
                    次
                </Space>
                <MustGetChart wish={[{
                    baseWish: () => new Character(),
                    bingoTimes: characterBingoTimes,
                    current: characterCurrent,
                    state: characterState,
                },
                    {
                        baseWish: () => new Weapon(),
                        bingoTimes: weaponBingoTimes,
                        current: weaponCurrent,
                        state: weaponState,
                    }
                ]} simulateTimes={simulateTimes}></MustGetChart>
            </Layout>

        </div>
    );
}