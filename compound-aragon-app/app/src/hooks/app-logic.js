import {deposit, supplyToken, redeemToken, setAgent, withdraw} from "../web3/CompoundContract";
import {useApi, useAppState} from "@aragon/api-react";
import {useCallback} from 'react'
import {useSidePanel} from "./side-panels";
import {useTabs} from "./tabs";
import {useSupplyState} from "./supply";
import {useRedeemState} from "./redeem-panel";
import {useTransferState} from "./transfer-panels";

const useSetAgentAddress = (onDone) => {
    const api = useApi()

    return useCallback(address => {
        setAgent(api, address)
        onDone()
    }, [api, onDone])
}

const useDeposit = (onDone) => {
    const api = useApi()

    return useCallback((token, amount, decimals) => {
        deposit(api, token, amount, decimals)
        onDone()
    }, [api, onDone])
}

const useWithdraw = (onDone) => {
    const api = useApi()

    return useCallback((token, recipient, amount, decimals) => {
        withdraw(api, token, recipient, amount, decimals)
        onDone()
    }, [api, onDone])
}

const useSupply = (onDone) => {
    const api = useApi()

    return useCallback((amount) => {
        supplyToken(api, amount)
        onDone()
    }, [api])
}

const useRedeem = (onDone) => {
    const api = useApi()

    return useCallback((amount, redeemAll) => {
        redeemToken(api, amount, redeemAll)
        onDone()
    }, [api])
}

export function useAppLogic() {
    const {
        isSyncing,
        appAddress,
        agentAddress,
    } = useAppState()

    const supplyState = useSupplyState()
    const redeemPanelState = useRedeemState()
    const transferPanelsState = useTransferState()
    const settings = {appAddress, agentAddress}

    const sidePanel = useSidePanel()
    const tabs = useTabs()

    const actions = {
        setAgentAddress: useSetAgentAddress(sidePanel.requestClose),
        deposit: useDeposit(sidePanel.requestClose),
        withdraw: useWithdraw(sidePanel.requestClose),
        supply: useSupply(sidePanel.requestClose),
        redeem: useRedeem(sidePanel.requestClose)
    }

    return {
        isSyncing,
        actions,
        sidePanel,
        tabs,
        supplyState,
        settings,
        redeemPanelState,
        transferPanelsState
    }
}