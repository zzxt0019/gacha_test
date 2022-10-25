import React from 'react';
import {InputNumber, Layout, Select, Space} from "antd";
import {MustGetChart} from "./charts/must-get-chart";
import {Character} from "./ys/character";
import {Weapon} from "./ys/weapon";

function App() {
    const [character, setCharacter] = React.useState(1);
    const [weapon, setWeapon] = React.useState(1);
    const [characterCurrent, setCharacterCurrent] = React.useState(0);
    const [weaponCurrent, setWeaponCurrent] = React.useState(0);
    const [characterState, setCharacterState] = React.useState('small');
    const [weaponState, setWeaponState] = React.useState('small0');
    const [simulateTimes, setSimulateTimes] = React.useState(20000);
    return (
        <Layout>
            <Space>
                <Select defaultValue={character} onChange={(value: number) => setCharacter(value)}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option value={c}>{c - 1}命</Select.Option>)}
                </Select>
                <Select defaultValue={weapon} onChange={(value: number) => setWeapon(value)}>
                    {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>{c}精</Select.Option>)}
                </Select>
                角色池已垫:
                <InputNumber defaultValue={0} onChange={(value: number | null) => {
                    if (value) {
                        setCharacterCurrent(value);
                    } else {
                        setCharacterCurrent(0);
                    }
                }}></InputNumber>
                <Select defaultValue={characterState} onChange={(value: string) => {
                    setCharacterState(value)
                }}>
                    <Select.Option value={'small'}>小保底</Select.Option>
                    <Select.Option value={'big'}>大保底</Select.Option>
                </Select>
                武器池已垫:
                <InputNumber defaultValue={0} onChange={(value: number | null) => {
                    if (value) {
                        setWeaponCurrent(0);
                    } else {
                        setWeaponCurrent(0);
                    }
                }}></InputNumber>
                <Select defaultValue={weaponState} onChange={(value: string) => {
                    setWeaponState(value)
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
                bingoTimes: character,
                current: characterCurrent,
                state: characterState,
            },
                {
                baseWish: () => new Weapon(),
                bingoTimes: weapon,
                current: weaponCurrent,
                state: weaponState,
            }
            ]} simulateTimes={simulateTimes}></MustGetChart>
        </Layout>
    );
}

export default App;
