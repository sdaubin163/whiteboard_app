function cmdInit() {
    if (window.formInterval) {
        clearInterval(window.formInterval);
      }
      window.formInterval = setInterval(() => {
        const form = document.querySelector('form');
        if (!form) return;
        clearInterval(window.formInterval);
        new MutationObserver(function (mutationsList) {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.removedNodes.length) {
              for (let node of mutation.removedNodes) {

                console.log('node:', node);

                textarea = node.querySelector('form textarea');
                if (textarea) {

                    console.log("12312");
                    console.log('textarea', textarea);
                    console.log('Textarea内容:', textarea.value);

                }

                console.log('form:', form);
                form.addEventListener('submit', (event) => {
                    event.preventDefault(); // 阻止表单的默认提交行为
      
                    console.log("===submit");
      
                    console.log('表单提交');
                    console.log('Textarea内容:', textarea.value);
      
                  });


                console.log('btnSend  node: ',  node);
                btnSend = form.querySelector('[data-testid="send-button"]');
                if (!btnSend.hasAttribute('click-listener')){
                    btnSend.setAttribute('click-listener', 'true');
                    console.log('2222btnSend: ',  btnSend);
                    btnSend.addEventListener('click', (event)=>{
                        event.preventDefault(); // 阻止表单的默认提交行为
                        console.log("===click");
                        console.log('click Textarea内容:', textarea.value);
    
    
                    });
                }

                

              }
            }
          }
        }).observe(document.body, {
          childList: true,
          subtree: true,
        });
      }, 300);

}


// if (document.readyState === 'complete' || document.readyState === 'interactive') {
//     cmdInit();
//   } else {
//     document.addEventListener('DOMContentLoaded', cmdInit);
//   }
  
window.addEventListener('DOMContentLoaded', () => {

    console.log("DOMContentLoaded ....");

  

  });

  
  async function updateUI(){
    const form = document.querySelector('form');
    if (!form) return;


    textarea = form.querySelector('form textarea');
    if (textarea) {

        console.log("12312");
        console.log('textarea', textarea);
        console.log('Textarea内容:', textarea.value);
    
        textarea.addEventListener("keydown", (event)=>{
            // event.preventDefault(); // 阻止表单的默认提交行为
            console.log("===keydown");
            console.log('keydown Textarea内容:', textarea.value);
        })
    }

    btnSend = form.querySelector('[data-testid="send-button"]');
    console.log("===btnSend : ", btnSend);


    btnSend.addEventListener('click', (event)=>{
        event.preventDefault(); // 阻止表单的默认提交行为
        console.log("===click");
        console.log('click Textarea内容:', textarea.value);
    });
  }

  const mutationObserver = new MutationObserver((mutations) => {
    
    if (!mutations.some(mutation => mutation.removedNodes.length > 0)) return

    // console.info("WebChatGPT: Mutation observer triggered")

    try {
    console.log("mutationObserver window.onload111 ....");

        updateUI()
        console.log("mutationObserver window.onload111222 ....");
    
    } catch (e) {
        if (e instanceof Error) {
            showErrorMessage(e)
        }
    }
})

window.onload = function () {

    console.log("window.onload ....");
    updateUI();

    mutationObserver.observe(document, { childList: true, subtree: true })
    console.log("window.onload222 ....");


}
window.onunload = function () {
    mutationObserver.disconnect()
}