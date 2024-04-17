import { Select, Divider } from "antd";
interface UserProps{
  users: {name: string; id: number}[],
  setSelectedUserId: (user: {value: number,label: string}) => void
}
function User(props: UserProps) {
  const onChange = (user: {value: number,label: string}) => {
    console.log("user",user)
    props.setSelectedUserId(user)
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: {value: number; label: string}
  ) => (option?.label ?? '').toLowerCase().startsWith(input.toLowerCase());
  return (
    <>
      <div
        style={{
          display: "flex",
          placeItems: "center",
          paddingRight: 40,
          gap: 10
        }}
      >
        <h3 style={{ fontWeight: "500", fontSize: 19 }}>User</h3>
        <Divider />
      </div>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={
          props.users.map((item)=>({value: item.id,label: item.name}))
        }
      />
    </>
  );
}
export default User;
