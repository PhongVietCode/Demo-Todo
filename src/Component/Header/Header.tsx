import { Divider } from "antd";

function Header() {
  return (
    <header style={{position: 'fixed',width: '100%', backgroundColor: 'rgba(250,250,250,0.9)', zIndex: 100}}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          placeItems: "center",
          justifyContent: "space-between",
          padding: 10
        }}
      >
        <img
          src="https://geekup.vn/Icons/geekup-logo-general.svg"
          height={32}
          alt="logo"
        />
        <h3 style={{color:'#1677ff'}}>To do</h3>
        <h3>Tran Quoc Phong</h3>
      </div>
      <Divider style={{margin:0}}/>
    </header>
  );
}
export default Header;
