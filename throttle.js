function throttle(func, wait) {
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;
    let lastExecuted = 0;

    const throttled = function(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastExecuted);
        lastArgs = args;
        lastThis = this;

        // Leading edge: If cooldown is over, execute immediately.
        if (remaining <= 0 || remaining > wait) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastExecuted = now;
            func.apply(lastThis, lastArgs);
            lastArgs = null;
            lastThis = null;
        } 
        // Trailing edge: Set a timeout if one isn't already set.
        else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastExecuted = Date.now();
                timeoutId = null;
                func.apply(lastThis, lastArgs);
                lastArgs = null;
                lastThis = null;
            }, remaining);
        }
    };

    // Add a cancel method for completeness (like Lodash)
    throttled.cancel = function() {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastExecuted = 0;
        lastArgs = null;
        lastThis = null;
    };

    return throttled;
}

function opThrottle(func, wait, options = {}) {
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;
    let lastExecuted = 0;

    // Set default options
    const leading = options.leading === undefined ? true : !!options.leading;
    const trailing = options.trailing === undefined ? true : !!options.trailing;

    // Helper to call the function and clear state
    const invokeFunc = function() {
        lastExecuted = Date.now();
        timeoutId = null;
        func.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
    };

    // Helper to start the trailing timeout
    const startTimer = function(remaining) {
        timeoutId = setTimeout(() => {
            // If leading is false, we execute immediately when the timeout is done.
            // If leading is true, the initial call was already made, so we execute 
            // the pending trailing call if necessary.
            if (leading === false && trailing === true) {
                // If leading is false, the first call happens here, but ONLY if 
                // there were calls during the wait period.
                invokeFunc();
            } else if (trailing === true) {
                 // Trailing call for leading=true case
                 invokeFunc();
            }
        }, remaining);
    };

    const throttled = function(...args) {
        const now = Date.now();
        lastArgs = args;
        lastThis = this;
        // Remaining time until the next possible execution
        const timeSinceLastExecution = now - lastExecuted;
        const remaining = wait - timeSinceLastExecution;
        const isReady = (remaining <= 0 || remaining > wait); // Check if cooldown is over

        if (isReady) {
            // Clear any existing trailing timeout, as the function will execute now
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            
            // 1. LEADING EDGE (if enabled)
            if (leading) {
                invokeFunc();
            }
            // If leading is false, we need to manually set the lastExecuted time 
            // here to ensure the `remaining` calculation works for the trailing call.
            else if (!timeoutId && trailing) {
                lastExecuted = now; // Pretend it just executed to start the cooldown
                startTimer(wait);
            }
            
        } else if (!timeoutId && trailing) {
            // 2. TRAILING EDGE (if enabled and no timeout is pending)
            // The function was called while a cooldown was active. Set a timeout 
            // to execute it when the cooldown is over.
            startTimer(remaining);
        }
    };

    // Add a cancel method
    throttled.cancel = function() {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastExecuted = 0;
        lastArgs = null;
        lastThis = null;
    };

    return throttled;
}