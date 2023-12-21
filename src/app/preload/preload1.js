
// MutationObserver 在每次 DOM 发生变化时都会执行回调函数
var load_flag = false
const observer = new MutationObserver((mutations, obs) => {

    if (!load_flag) {
        var form = document.querySelector('form.stretch');
        if (form) {
          
          if (!form.hasAttribute('data-listener')){
            form.setAttribute('data-listener', 'true');
            console.log("===加载成功");

            console.log(form);

            form.addEventListener('submit', (event) => {
              event.preventDefault(); // 阻止表单的默认提交行为

              console.log("===submit");

              var textarea = document.getElementById('prompt-textarea');
              console.log(textarea);

              console.log('表单提交');
              console.log('Textarea内容:', textarea.value);

            });

            form.onsubmit = function () {
                console.log("=========");
                // 执行异步提交逻辑
                return false; // 阻止默认提交
              };
              
    
            load_flag = true;
             // 如果需要停止观察 DOM 变化，调用 disconnect 方法
            observer.disconnect();
          }
        }
    
    }
    
  });
  
  observer.observe(document, { childList: true, subtree: true });
  