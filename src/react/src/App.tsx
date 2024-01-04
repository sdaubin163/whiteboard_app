import {Tldraw, createTLStore, defaultShapeUtils, TLStoreWithStatus} from '@tldraw/tldraw'

// import {Tldraw} from '@tldraw/tldraw'

import '@tldraw/tldraw/tldraw.css'
import { SaveButton } from './SaveButton'
import {useEffect, useState} from "react";

function App() {
	const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
		status: 'loading',
		store : undefined
	})

	// 除了用useEffect 也可以用其他方法，实现数据在初始时加载一次的目的
	// useEffect 是参照帮助文档的代码
	useEffect(() => {
		let cancelled = false
		async function loadRemoteSnapshot() {
			// Get the snapshot
			const snapshot = await window.whiteboardAPI.getContentsFromFile();
			const snapshotcontents = JSON.parse(snapshot);
			if (cancelled) return

			// Create the store
			const newStore = createTLStore({
				shapeUtils: defaultShapeUtils,
			})

			// Load the snapshot
			newStore.loadSnapshot(snapshotcontents)

			// Update the store with status
			setStoreWithStatus({
				store: newStore,
				status: "synced-local",
			})

			console.log("从本地加载数据成功");

			// newStore.listen(() => {
			// 	// 如果发生变化
			// 	console.log('数据发生变化');
		
			// 	// console.log(editor.getDocumentSettings().gridSize)
			// 			const snapshot = newStore.getSnapshot('all')
			// 			const stringified = JSON.stringify(snapshot)
			// 		window.whiteboardAPI.autoSaveContentsToFile(stringified)
			// 		console.log('保存数据到本地-完成');
			// })


			let idx = 1;
			newStore.listen((changes) => {
				console.log('Changes occurred:', changes);
				console.log(idx);
				idx++;
				
				// 在这里处理变化
			  },
			  { source: 'user', scope: 'document'} // 仅监听文档变化)
			  );

			// if (newStore) {
			// 	newStore.onAfterChange(()=>{
			// 		console.log("User made changes");
			// 		// 处理用户引起的变更
			// })
			// }
			


		}

		loadRemoteSnapshot()

		return () => {
			cancelled = true
		}
	}, [])// 空依赖列表，useEffect 仅在组件首次挂载时执行


	return (
		<div style={{position: 'fixed', inset: 50}}>
			<Tldraw store={storeWithStatus}>
			<div id='saveDiv'>
				<SaveButton></SaveButton>
      		</div>
			</Tldraw>
		</div>
	)

	// return (
	// 	<div style={{position: 'fixed', inset: 0, }}>
	// 		<Tldraw >
	// 		</Tldraw>
	// 	</div>
	// )
}

export default App




