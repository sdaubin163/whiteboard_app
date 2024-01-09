import {useEditor} from "@tldraw/editor";

export function SaveButton() {
    
    // const saveFile = (content:string) => {
    //     ipcRenderer.send('save-file', content);
    //   }

    const editor = useEditor();
    
    return (
        <button id='save_button'
            onClick={async () => {
                if (editor == null ) {
                    console.log("111111")
                }else {
                    console.log("222")
                }
                // Create an arrow!

                console.log("222222222")
                try {
                    const content = await window.smartboardAPI.getContentsFromFile();
                    console.log(content); // 这里的 content 是字符串
                    const contentsnapshot = JSON.parse(content)
                    editor.store.loadSnapshot(contentsnapshot);
                } catch (err) {
                    console.error(err);
                }
                console.log('333333333');
                console.log('是在同步等待吗？？');

                
                // console.log(editor.getDocumentSettings().gridSize)
                // const snapshot = editor.store.getSnapshot('all')
                // const stringified = JSON.stringify(snapshot)
                //
                // localStorage.setItem('my-editor-snapshot', stringified)
                //
                // // ipcRenderer.send('save-file', stringified);
                //
                // window.smartboardAPI.autoSaveContentsToFile(stringified);

            }}
        >
            保存
        </button>
    )
}
