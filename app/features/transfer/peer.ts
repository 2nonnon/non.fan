// import type { DataConnection } from 'peerjs'
// import Peer from 'peerjs'
// import { useEffect, useLayoutEffect, useState } from 'react'
// import { FileArea } from './file-area'
// import { LocalArea, queryKey } from './local-area'

// const [localRoomId, setLocalRoomId] = useState('')
// const [remoteRoomId, setRemoteRoomId] = useState('')
// const [peer, setPeer] = useState<Peer | null>(null)
// const [connection, setConnection] = useState<DataConnection | null>(null)
// const [isConnected, setIsConnected] = useState(false)

// useLayoutEffect(() => {
//   const params = new URLSearchParams(window.location.search)
//   const roomIdFromUrl = params.get(queryKey)
//   if (roomIdFromUrl) {
//     setRemoteRoomId(roomIdFromUrl)
//   }
// }, [])

// function connect() {
//   if (peer && remoteRoomId) {
//     if (connection && connection.peer === remoteRoomId) {
//       setIsConnected(true)
//     }
//     else {
//       const connection = peer.connect(remoteRoomId)
//       setConnection(connection)
//     }
//   }
// }

// useEffect(() => {
//   if (connection) {
//     connection.on('open', () => {
//       // console.log('Connection opened');
//       setIsConnected(true)
//     })

//     connection.on('close', () => {
//       // console.log('Connection closed');
//       setIsConnected(false)
//     })
//   }
// }, [connection])

// useEffect(() => {
//   try {
//     const newPeer = new Peer({ debug: 2 })
//     setPeer(newPeer)

//     newPeer.on('open', (id) => {
//       setLocalRoomId(id)
//     })

//     newPeer.on('connection', (connection) => {
//       // console.log('New connection:', connection, connection.dataChannel);

//       setConnection(connection)
//     })

//     newPeer.on('error', (error) => {
//       console.error('Peer error:', error)
//       setLocalRoomId('')
//       setPeer(null)
//       setConnection(null)
//       setIsConnected(false)
//     })

//     return () => {
//       newPeer.destroy()
//     }
//   }
//   catch (error) {
//     console.error('Error initializing peer:', error)
//   }
// }, [])

// const { connection, disconnect } = props
// const [remoteData, setRemoteData] = useState<MessageData[]>([])
// const [localData, setLocalData] = useState<MessageData[]>([])
// const content = useRef('')

// const create = useDialog()

// useEffect(() => {
//   if (connection) {
//     connection.on('data', (data) => {
//       // console.log('Received data:', data);

//       if (!isMessage(data)) {
//         return
//       }

//       if (data.type === 'transfer') {
//         setRemoteData(prev => [...prev, data.data])
//       }
//     })

//     return () => {
//       connection.off('data')
//     }
//   }
// }, [connection])
