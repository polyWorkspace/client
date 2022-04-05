import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./Account.module.scss";
import { useSelector } from "react-redux";
import { Popover } from "@mui/material";
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from "@web3-onboard/react";
// import {
//   getBlockchain,
//   isValidNetwork,
//   getContactProvider,
// } from "../../utils/ethereum";
import Store from "../../redux/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "next/router";
import initWeb3Onboard from "./initWeb3Onboard";
import web3 from "web3";

const UserAccount = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();

  const [web3Onboard, setWeb3Onboard] = useState(null);
  const [accounts, setAccounts] = useState(undefined);
  const [claimMessage, setClaimMessage] = useState({
    payload: undefined,
    type: undefined,
  });

  const wallet2 = useSelector((state) => state.wallet);
  const router = useRouter();
  const aMenu = [
    {
      id: "my-form",
      label: "My Form",
      icon: AssignmentOutlinedIcon,
      router: "/form/my-form",
    },
    {
      id: "my-event",
      label: "My Event",
      icon: EventIcon,
      router: "/event/my-event",
    },
    {
      id: "my-calendar",
      label: "My Calendar",
      icon: DateRangeOutlinedIcon,
      router: "/calendar",
    },
  ];
  const wrapperRef = useRef(null);

  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
    // alert('---wallet---', wallet);
  }, []);

  useEffect(() => {
    const init = async () => {
      //console.log("--process.env---",process.env)
      try {
        //alert('connectedWallets.length', connectedWallets.length);
        //  const { airdrop, accounts = [] } = await getBlockchain(initWeb3Onboard);
        //setAirdrop(airdrop);
        setAccounts(accounts[0]);
        //setLoading(false);
      } catch (e) {
        // setLoadingMessage(e);
      }
      if (typeof window.ethereum !== "undefined") {
        // Existing code goes here

        window?.ethereum?.on("accountsChanged", function (accounts) {
          console.log(`Selected account changed to ${accounts[0]}`);
          setAccounts(accounts[0]);
        });

        window?.ethereum?.on("chainChanged", () => {
          //window.location.reload();
        });
        /*window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });*/
      }
    };
    init();
  }, []);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] });
      }
      setWalletFromLocalStorage();
    }
  }, [web3Onboard, connect]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (event) => {
    const { target } = event;
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setPopoverVisible(false);
    }
  };

  const onNavItemClick = (route) => {
    setPopoverVisible(false);
    router.push(route);
  };

  const [state, setState] = useState({
    anchorEl: null,
    popoverOpen: false,
    popoverId: undefined,
  });
  const onRequestConnectWallet = () => {
    const { nearConfig, walletConnection } = wallet;
    walletConnection?.requestSignIn?.(nearConfig?.contractName);
  };

  const onRequestSignOut = () => {
    const { walletConnection } = wallet;
    walletConnection.signOut();
    router.push("/");
  };

  // const handleConnect = async (account) => {
  //     //setClaimMessage({ type: '', payload: '' });
  //     let localwallets = await connect({});

  //     //alert(wallet?.accounts[0]?.address);
  //     // if (wallets && wallets[0]?.accounts) {
  //     //     setAccounts(wallets[0]?.accounts[0]?.address);

  //     //     Store.dispatch(
  //     //         onUpdateWallet({
  //     //             contract,
  //     //             currentUser: wallets[0]?.accounts[0]?.address,
  //     //             nearConfig,
  //     //             walletConnection,
  //     //         }),
  //     //     );

  //     //     this.setState({
  //     //         isConnected: true,
  //     //     });
  //     // } else {
  //     //     // alert('condiiton false');
  //     // }
  //     // console.log(wallet);
  //     // console.log(localwallets);
  // };

  const handleDisconnect = async () => {
    /*const [primaryWallet] = initWeb3Onboard.state.get().wallets
        let res = await initWeb3Onboard.disconnectWallet()
        console.log("----res----",res)
        setAccounts(null);*/
    await disconnect(wallet);
    // const connectedWalletsList = connectedWallets.map(({ label }) => label);
    window.localStorage.setItem("connectedWallets", null);
    localStorage.clear();
  };

  const onRenderSignInButton = () => {
    return (
      <div className={styles.signIn_area}>
        {/* <button
                    className={styles.signIn_button}
                    onClick={() => {
                        handleConnect(accounts);
                    }}
                >
                    <span>{accounts || 'Connect Wallet'}</span>
                </button> */}

        {!wallet && (
          <button
            className={styles.signIn_button}
            onClick={() => {
              connect();
            }}
          >
            <span> Connect Your Wallet</span>
          </button>
        )}
        {/* <div>Address = {wallet?.accounts[0]?.address}</div> */}

        {wallet && (
          <button
            className={styles.signIn_button}
            // onClick={() => {
            //     handleDisconnect();
            // }}
          >
            <div className={styles.dropdown}>
              {/* <button className={styles.dropbtn}>Select Data Storage</button> */}

              <button className={styles.dropbtn}>
                Address = {wallet?.accounts[0]?.address}
              </button>
              {/* <div className={styles.wrap}>Address = {wallet?.accounts[0]?.address}</div> */}
              <div className={styles.dropdown_content}>
                <a href="#"></a>

                <a href="#">Balance={wallet?.accounts[0]?.ba}</a>
                {/* <a href="">bweb3.fromWei(web3.eth.getBalance(wallet?.accounts[0]?.ba));</a> */}
                <a href="#">Ens={wallet?.accounts[0]?.ens}</a>

                {/* {console.log(web3.fromWei(web3.eth.getBalance(wallet?.accounts[0]?.ba)))} */}

                <a
                  onClick={() => {
                    handleDisconnect();
                  }}
                >
                  Disconnect
                </a>
              </div>
            </div>
          </button>
        )}
      </div>
    );
  };

  const onOpenAccountPopover = (e) => {
    setPopoverVisible(false);
    setPopoverVisible(!popoverVisible);
  };

  const onCloseAccountPopover = () => {
    setState({
      anchorEl: null,
      popoverOpen: false,
      popoverId: undefined,
    });
  };

  const onRenderAccountDetail = () => {
    const { walletConnection } = wallet;
    const { anchorEl, popoverOpen, popoverId } = state;
    const accountId = walletConnection?.getAccountId?.();
    let popoverRight = 1000;
    if (typeof window !== "undefined") {
      popoverRight = window?.screen?.width - 15;
    }
    return (
      <div className={styles.signIn_area} ref={wrapperRef}>
        <button
          className={styles.account_button}
          onClick={onOpenAccountPopover}
        >
          <AccountCircleIcon className={styles.account_button_icon} />
          <div className={styles.account_button_accountId_area}>
            {accountId}
          </div>
          <ArrowDropDownIcon className={styles.account_button_drop_icon} />
        </button>
        {popoverVisible && (
          <div className={styles.account_popover}>
            {aMenu.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={styles.account_popover_label}
                    onClick={() => onNavItemClick(item.router)}
                  >
                    <item.icon className={styles.account_popover_icon} />
                    {item.label}
                  </div>
                  <div className={styles.line} />
                </Fragment>
              );
            })}
            <div
              className={styles.account_popover_label}
              onClick={onRequestSignOut}
            >
              <LogoutSharpIcon className={styles.account_popover_icon} />
              Log out
            </div>
          </div>
        )}
        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={onCloseAccountPopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 70, left: popoverRight }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={styles.popover_container}
        >
          <div className={styles.signOut_area}>
            <button
              className={styles.signOut_button}
              onClick={onRequestSignOut}
            >
              <LogoutSharpIcon className={styles.signOut_button_icon} />
              <div className={styles.signOut_button_content}>Logout</div>
            </button>
          </div>
        </Popover>
      </div>
    );
  };

  const onRenderScene = () => {
    const { walletConnection } = wallet2;
    const isSigned = walletConnection?.isSignedIn?.();
    if (isSigned) {
      return onRenderAccountDetail();
    }
    return onRenderSignInButton();
  };

  return <div className={styles.root}>{onRenderScene()}</div>;
};

export default UserAccount;
