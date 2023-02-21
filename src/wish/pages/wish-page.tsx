import {Col, InputNumber, Row, Select, Spin, Tooltip} from "antd";
import {MustGetChart} from "../charts/must-get-chart";
import React from "react";
import {Weapon} from "../service/weapon";
import {tuple2Enum} from "../../base/data";
import {Character} from "../service/character";
import {CaretRightOutlined, CloseOutlined, LoadingOutlined, PauseOutlined, ReloadOutlined} from "@ant-design/icons";

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
    const [, setRefreshPage] = React.useState(false);
    const [refreshChart, setRefreshChart] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [pause, setPause] = React.useState(false);
    const [pauseChange, setPauseChange] = React.useState(false);
    return (
        <>
            <Row>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            5星角色
                        </Col>
                        <Col span={16}>
                            <Select value={characterTargets.get(tuple2Enum([5, 'up'])) ?? 0} disabled={loading}
                                    bordered={false}
                                    onChange={(value: number) => {
                                        characterTargets.set(tuple2Enum([5, 'up']), value);
                                        !pause && setRefreshChart(refresh => !refresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c} value={c}>
                                    {c === 0 ? '无' : `${c - 1}命`}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            角色池已垫
                        </Col>
                        <Col span={16}>
                            <InputNumber value={characterCurrent[0]} disabled={loading}
                                         min={0} max={89} precision={0} bordered={false}
                                         onBlur={() => {
                                             !pause && setRefreshChart(fresh => !fresh);
                                             pause && setPauseChange(true);
                                             setRefreshPage(refresh => !refresh);
                                         }}
                                         onChange={(value: number | null) => {
                                             setCharacterCurrent([value ? value : 0, 0]);
                                         }}></InputNumber>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            角色池保底
                        </Col>
                        <Col span={16}>
                            <Select value={characterState[0][0]} disabled={loading} bordered={false}
                                    onChange={(value: number) => {
                                        setCharacterState([[value], characterState[1]]);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                <Select.Option value={0}>小保底</Select.Option>
                                <Select.Option value={1}>大保底</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            5星武器
                        </Col>
                        <Col span={16}>
                            <Select value={weaponTargets.get(tuple2Enum([5, 'up'])) ?? 0} disabled={loading}
                                    bordered={false}
                                    onChange={(value: number) => {
                                        weaponTargets.set(tuple2Enum([5, 'up']), value);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>
                                    {c === 0 ? '无' : `${c}精`}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            武器池已垫
                        </Col>
                        <Col span={16}>
                            <InputNumber value={weaponCurrent[0]} disabled={loading} bordered={false}
                                         min={0} max={79} precision={0}
                                         onBlur={() => {
                                             !pause && setRefreshChart(fresh => !fresh);
                                             pause && setPauseChange(true);
                                             setRefreshPage(refresh => !refresh);
                                         }}
                                         onChange={(value: number | null) => {
                                             setWeaponCurrent([value ? value : 0, 0]);
                                         }}></InputNumber>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            武器池保底
                        </Col>
                        <Col span={8}>
                            <Select value={weaponState[0][0]} disabled={loading} bordered={false}
                                    onChange={(value: number) => {
                                        setWeaponState([[value, weaponState[0][1]], weaponState[1]]);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                <Select.Option value={0}>小保底</Select.Option>
                                <Select.Option value={1}>大保底</Select.Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Select value={weaponState[0][1]} disabled={loading} bordered={false}
                                    onChange={(value: number) => {
                                        weaponState[0][1] = value;
                                        setWeaponState([[weaponState[0][0], value], weaponState[1]]);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[0, 1, 2].map(value => <Select.Option
                                    value={value}>定轨{value}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            4星角色
                        </Col>
                        <Col span={16}>
                            <Select value={characterTargets.get(tuple2Enum([4, 'up1'])) ?? 0} disabled={loading}
                                    bordered={false}
                                    onChange={(value: number) => {
                                        characterTargets.set(tuple2Enum([4, 'up1']), value);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <Select.Option key={c} value={c}>
                                    {c === 0 ? '无' : `${c - 1}命`}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            4星武器
                        </Col>
                        <Col span={16}>
                            <Select value={weaponTargets.get(tuple2Enum([4, 'up1'])) ?? 0} disabled={loading}
                                    bordered={false}
                                    onChange={(value: number) => {
                                        weaponTargets.set(tuple2Enum([4, 'up1']), value);
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[0, 1, 2, 3, 4, 5].map(c => <Select.Option key={c} value={c}>
                                    {c === 0 ? '无' : `${c}精`}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            模拟次数
                        </Col>
                        <Col span={16}>
                            <Select value={simulateTimes} disabled={loading} bordered={false}
                                    onChange={(value: number) => {
                                        setSimulateTimes(value)
                                        !pause && setRefreshChart(fresh => !fresh);
                                        pause && setPauseChange(true);
                                        setRefreshPage(refresh => !refresh);
                                    }}>
                                {[20000, 50000, 100000].map(value => <Select.Option
                                    value={value}>{value}</Select.Option>)}
                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={8} sm={8} md={6} lg={6} xl={6} xxl={3}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            刷新
                        </Col>
                        <Col span={16}>
                            <Tooltip title={'刷新'}>
                                {loading ?
                                    <LoadingOutlined spin={true} disabled={true}/> :
                                    <ReloadOutlined onClick={() => {
                                        setRefreshChart(fresh => !fresh);
                                    }}/>}
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} sm={8} md={6} lg={6} xl={6} xxl={3}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            还原
                        </Col>
                        <Col span={16}>
                            <Tooltip title={'还原'}>
                                <CloseOutlined disabled={loading} onClick={() => {
                                    setCharacterCurrent([0, 0]);
                                    setWeaponCurrent([0, 0]);
                                    setCharacterState([[0], [0]]);
                                    setWeaponState([[0, 0], [0]]);
                                    setSimulateTimes(20000);
                                    characterTargets.clear();
                                    characterTargets.set(tuple2Enum([5, 'up']), 1);
                                    weaponTargets.clear();
                                    setRefreshChart(fresh => !fresh);
                                    setPauseChange(false);
                                }}/>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} sm={8} md={6} lg={6} xl={6} xxl={3}>
                    <Row align={'middle'}>
                        <Col span={8}>
                            {pause ? '运行' : '暂停'}
                        </Col>
                        <Col span={16}>
                            <Tooltip title={pause ? '运行' : '暂停'}>
                                {pause ?
                                    <CaretRightOutlined onClick={() => {
                                        if (pauseChange) {
                                            setRefreshChart(fresh => !fresh);
                                            setPauseChange(false);
                                        }
                                        setPause(pause => !pause);
                                    }}/> :
                                    <PauseOutlined onClick={() => {
                                        setPause(pause => !pause);
                                    }}/>}
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
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
                ]} simulateTimes={simulateTimes} loadings={[loading, setLoading, refreshChart]}></MustGetChart>
            </Spin>
        </>
    )
        ;
}