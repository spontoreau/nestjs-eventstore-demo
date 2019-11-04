fromCategory('account')
    .foreachStream()
    .when({
        $init:function() {
            return {
                balance: 0
            }
        },
        Deposited: function(state, event) {
            state.balance += event.data.amount
        },
        Withdrew: function(state, event) {
            state.balance -= event.data.amount
        }
    });