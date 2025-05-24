import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setAddFriend] = useState(false)
  const [friends, setfriends] = useState(initialFriends)

  function handleShowAddFriend() {
    setAddFriend(prev => !prev)
  }

  function handleAddFriend(friend) {
    setfriends(prev => [...prev, friend])
    setAddFriend(false)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}/>
        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "close" : "Add Friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendsList({friends}) {

  return (
    <ul>
      {friends.map(friend => <Friend key={friend.id} friend={friend}/>)}
    </ul>
  )
}

function Friend({friend}) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
     {friend.balance > 0 && <p className="green">{friend.name} ows you {Math.abs(friend.balance)}$</p>}
     {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
     {friend.balance === 0 && <p className="">You and {friend.name} are even</p>}
     <button className="button">Select</button>
    </li>
  )
}

function AddFriend({onAddFriend}) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !image) return;

    const id =crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }
    onAddFriend(newFriend)
    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯 Friend Name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>🏞️ Image URL</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>😃 Your expense</label>
      <input type="text" />
      <label>😎 XXX expense</label>
      <input type="text" disabled/>
      <label>🤑 Who's paying the bill</label>
      <select>
        <option value="">you</option>
        <option value="">XXX</option>
      </select>

    </form>
  )
}