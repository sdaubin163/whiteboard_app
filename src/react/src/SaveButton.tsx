

function SaveButton() {
    const editor = useEditor()
    return (
        <button
            onClick={() => {
        const snapshot = editor.store.getSnapshot()
        const stringified = JSON.stringify(snapshot)
        localStorage.setItem('my-editor-snapshot', stringified)
    }}
>
    Save
    </button>
)
}
