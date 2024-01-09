import {Tldraw, createTLStore, defaultShapeUtils, TLStoreWithStatus,TLUserPreferences, setUserPreferences, getUserPreferences, Editor, TLStore, TLInstance} from '@tldraw/tldraw'

// import {Tldraw} from '@tldraw/tldraw'

import '@tldraw/tldraw/tldraw.css'
import { useCallback, useEffect, useState } from 'react'
import debounce from './debounce';

function App() {
	const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
		status: 'loading',
		store : undefined
	})
	const [editor, setEditor] = useState<Editor>()
	const setAppToState = useCallback((editor: Editor) => {
		setEditor(editor)
	}, [])

	console.log('111111111111');


	// let idx = 1;
	// 自动保存Tldraw的修改
	function autoSave( newStore: TLStore){
		// console.log('Changes occurred:', changes);
		// console.log(idx);
		// idx++;

		const snapshot = newStore.getSnapshot('all')
		const stringified = JSON.stringify(snapshot)
		window.smartboardAPI.autoSaveContentsToFile(stringified)
		// console.log('保存数据到本地-完成');
		// console.log('执行时间：',Date.now().toLocaleString());
		
	}
	// 注册debounce函数，目的是每隔3秒执行一次 autoSave
	const debounceAutoSave= debounce(autoSave, 3000);

	// 除了用useEffect 也可以用其他方法，实现数据在初始时加载一次的目的
	// useEffect 是参照帮助文档的代码
	useEffect(() => {
		let cancelled = false
		async function loadRemoteSnapshot() {
			// Create the store
			const newStore: TLStore = createTLStore({
				shapeUtils: defaultShapeUtils,
			})
			if (cancelled) return

			// Get the snapshot
			const snapshot = await window.smartboardAPI.getContentsFromFile();

			// Load the snapshot
			if (snapshot) {
				let snapshotcontents = JSON.parse(snapshot);
				newStore.loadSnapshot(snapshotcontents)
			}

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
			// 		window.smartboardAPI.autoSaveContentsToFile(stringified)
			// 		console.log('保存数据到本地-完成');
			// })


			// let idx = 1;
			// newStore.listen((changes) => {
			// 	console.log('Changes occurred:', changes);
			// 	console.log(idx);
			// 	idx++;
				
			// 	// 在这里处理变化
			//   },
			//   { source: 'user', scope: 'document'} // 仅监听文档变化)
			//   );



			newStore.listen(() => debounceAutoSave(newStore),
			  { source: 'user', scope: 'document'} // 仅监听文档变化)
			  );

		}

		loadRemoteSnapshot();


		// 设置显示网格 和黑色主题
		if (editor) {
			console.log('设置显示网格...');

			// let tlinstance: TLInstance = editor.getInstanceState();
			// 设置显示网格
			// tlinstance.isGridMode = true;
			// editor.updateInstanceState({
			// 	isGridMode: true
			// });
	  
			let user: TLUserPreferences = getUserPreferences();
			user.isDarkMode = true;
			// 设置显示黑色主题
			setUserPreferences(user);
			console.log('黑色主题设置成功...');
		  }


		return () => {
			cancelled = true
		}
	}, [])// 空依赖列表，useEffect 仅在组件首次挂载时执行
	console.log('1111111111112');

	if (editor) {
		let tlinstance : TLInstance = editor.getInstanceState();
		// 设置显示网格
		tlinstance.isGridMode = true;
		editor.updateInstanceState(tlinstance);
		console.log('设置显示网格...');

	}
	
	let user : TLUserPreferences =  getUserPreferences();
	user.isDarkMode = true;
	// 设置显示黑色主题
	setUserPreferences(user);
	console.log('黑色主题设置成功...');


	// useEffect(() => {
	// 	if (!editor) return

	// 	// function logChangeEvent(eventName: string) {
	// 	// 	setStoreEvents((events) => [eventName, ...events])
	// 	// }

	// 	function saveData(editor: Editor){
	// 		console.log('检测到发生变化...');
	// 		// console.log(editor.getDocumentSettings().gridSize)
	// 		const snapshot = editor.store.getSnapshot('all')
	// 		const stringified = JSON.stringify(snapshot)
	// 		window.smartboardAPI.autoSaveContentsToFile(stringified);
	// 		console.log('保存成功。。。');
	// 	}

	// 	// This is the fire hose, it will be called at the end of every transaction
	// 	const handleChangeEvent: TLEventMapHandler<'change'> = (change) => {
	// 		if (change.source === 'user') {

	// 			// // Added
	// 			for (const record of Object.values(change.changes.added)) {
	// 				if (record.typeName === 'shape') {
	// 					// logChangeEvent(`created shape (${record.type})`)
	// 					saveData(editor);
	// 				}
	// 			}

	// 			// // Updated
	// 			for (const [from, to] of Object.values(change.changes.updated)) {
	// 				if (
	// 					from.typeName === 'instance' &&
	// 					to.typeName === 'instance' &&
	// 					from.currentPageId !== to.currentPageId
	// 				) {
	// 					// logChangeEvent(`changed page (${from.currentPageId}, ${to.currentPageId})`)
	// 					saveData(editor);

	// 				}
	// 			}

	// 			// // Removed
	// 			for (const record of Object.values(change.changes.removed)) {
	// 				if (record.typeName === 'shape') {
	// 					// logChangeEvent(`deleted shape (${record.type})`)
	// 					saveData(editor);

	// 				}
	// 			}
	// 		}

	// 	}

	// 	editor.on('change', handleChangeEvent)

	// 	return () => {
	// 		editor.off('change', handleChangeEvent)
	// 	}
	// }, [editor])

	// if (editor){
	// 	console.log('获得editor');
	// } else {
	// 	console.log('1111111',editor);
	// }
	
	
	return (
		<div style={{position: 'fixed', inset: 0,}}>
			<Tldraw store={storeWithStatus} onMount={setAppToState}>
			</Tldraw>
		</div>
	)

	// return (
	// 	<div style={{position: 'fixed', inset: 0,}}>
	// 		<Tldraw store={storeWithStatus} onMount={setAppToState}>
	// 		<div id='saveDiv'>
	// 			<SaveButton></SaveButton>
    //   		</div>
	// 		</Tldraw>
	// 	</div>
	// )


	// return (
	// 	<div style={{position: 'fixed', inset: 0, }}>
	// 		<Tldraw >
	// 		</Tldraw>
	// 	</div>
	// )
}

export default App




