import {Button, InputNumber, Layout, Select, Space, Spin, Tooltip} from "antd";
import {MustGetChart} from "../charts/must-get-chart";
import React from "react";
import {Weapon} from "../service/weapon";
import {tuple2Enum} from "../../base/data";
import {Character} from "../service/character";
import {
    CloseOutlined,
    LoadingOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    ReloadOutlined
} from "@ant-design/icons";

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
    const [loading, setLoading] = React.useState(false);
    const [pause, setPause] = React.useState(false);
    const [pauseChange, setPauseChange] = React.useState(false);
    return (
        <div>
            <Layout>
                <Space wrap={true}>
                    <Button onClick={() => {
                        if (pause && pauseChange) {
                            setCount(count => count + 1);
                            setPauseChange(false);
                        }
                        setPause(pause => !pause);
                    }}>
                        {pause ? <PlayCircleOutlined/> : <PauseCircleOutlined/>}
                    </Button>
                    <Select value={characterTargets.get(tuple2Enum([5, 'up'])) ?? 0} disabled={loading}
                            style={{width: '90px'}}
                            onChange={(value: number) => {
                                characterTargets.set(tuple2Enum([5, 'up']), value);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c} value={c}>
                            {c === 0 ? '无' : `${c - 1}命5星`}</Select.Option>)}
                    </Select>
                    <Select value={weaponTargets.get(tuple2Enum([5, 'up'])) ?? 0} disabled={loading}
                            style={{width: '90px'}}
                            onChange={(value: number) => {
                                weaponTargets.set(tuple2Enum([5, 'up']), value);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>
                            {c === 0 ? '无' : `${c}精5星`}</Select.Option>)}
                    </Select>
                    <Select value={characterTargets.get(tuple2Enum([4, 'up1'])) ?? 0} disabled={loading}
                            style={{width: '90px'}}
                            onChange={(value: number) => {
                                characterTargets.set(tuple2Enum([4, 'up1']), value);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c} value={c}>
                            {c === 0 ? '无' : `${c - 1}命4星`}</Select.Option>)}
                    </Select>
                    <Select value={weaponTargets.get(tuple2Enum([4, 'up1'])) ?? 0} disabled={loading}
                            style={{width: '90px'}}
                            onChange={(value: number) => {
                                weaponTargets.set(tuple2Enum([4, 'up1']), value);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>
                            {c === 0 ? '无' : `${c}精4星`}</Select.Option>)}
                    </Select>
                    <InputNumber value={characterCurrent[0]} disabled={loading}
                                 addonBefore={'角色池已垫'} style={{width: '165px'}}
                                 min={0} max={89} precision={0}
                                 onChange={(value: number | null) => {
                                     setCharacterCurrent([value ? value : 0, 0]);
                                     !pause && setCount(count => count + 1);
                                     pause && setPauseChange(true);
                                 }}></InputNumber>
                    <Select value={characterState[0][0]} disabled={loading}
                            onChange={(value: number) => {
                                setCharacterState([[value], characterState[1]]);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        <Select.Option value={0}>角色池小保底</Select.Option>
                        <Select.Option value={1}>角色池大保底</Select.Option>
                    </Select>
                    <InputNumber value={weaponCurrent[0]} disabled={loading}
                                 addonBefore={'武器池已垫'} style={{width: '165px'}}
                                 min={0} max={79} precision={0}
                                 onChange={(value: number | null) => {
                                     setWeaponCurrent([value ? value : 0, 0]);
                                     !pause && setCount(count => count + 1);
                                     pause && setPauseChange(true);
                                 }}></InputNumber>
                    <Select value={weaponState[0][0]} disabled={loading}
                            onChange={(value: number) => {
                                setWeaponState([[value, weaponState[0][1]], weaponState[1]]);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        <Select.Option value={0}>武器池小保底</Select.Option>
                        <Select.Option value={1}>武器池大保底</Select.Option>
                    </Select>
                    <Select value={weaponState[0][1]} disabled={loading}
                            onChange={(value: number) => {
                                weaponState[0][1] = value;
                                setWeaponState([[weaponState[0][0], value], weaponState[1]]);
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        <Select.Option value={0}>0定轨</Select.Option>
                        <Select.Option value={1}>1定轨</Select.Option>
                        <Select.Option value={2}>满定轨</Select.Option>
                    </Select>
                    <Select value={simulateTimes} disabled={loading}
                            onChange={(value: number) => {
                                setSimulateTimes(value)
                                !pause && setCount(count => count + 1);
                                pause && setPauseChange(true);
                            }}>
                        {[20000, 50000, 100000].map(value => <Select.Option
                            value={value}>模拟{value}次</Select.Option>)}
                    </Select>
                    <Tooltip title={'还原初始值'}>
                        <Button disabled={loading} onClick={() => {
                            setCharacterCurrent([0, 0]);
                            setWeaponCurrent([0, 0]);
                            setCharacterState([[0], [0]]);
                            setWeaponState([[0, 0], [0]]);
                            setSimulateTimes(20000);
                            characterTargets.clear();
                            characterTargets.set(tuple2Enum([5, 'up']), 1);
                            weaponTargets.clear();
                            setCount(count => count + 1);
                            setPauseChange(false);
                        }}><CloseOutlined/></Button>
                    </Tooltip>
                    <Tooltip title={'刷新'}>
                        <Button disabled={loading} onClick={() => {
                            setCount(count => count + 1);
                        }}>
                            {loading ? <LoadingOutlined spin={true}/> : <ReloadOutlined/>}
                        </Button>
                    </Tooltip>
                </Space>
                <Spin spinning={loading}>
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
                    ]} simulateTimes={simulateTimes} loadings={[loading, setLoading, count]}></MustGetChart>
                </Spin>
            </Layout>
        </div>
    );
}