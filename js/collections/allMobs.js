var allSubnets = (function () {
    var instance;
    function init() {
        var _mobs = [];

        function add(m) {
            _mobs.push(m);
        }
        function get(index) {
            return _mobs[index];
        }
        function getAll() {
            return _mobs;
        }
        function set(index, obj) {
            _mobs[index] = obj;
        }
        function length() {
            return _mobs.length;
        }
        function toList() {
            return _mobs;
        }
        function clear() {
            _subnets = [];
        }
        function toJSON() {
        }

        return {
            get:get,
            getAll:getAll,
            set:set,
            add:add,
            length:length,
            toList:toList,
            clear:clear,
            toJSON:toJSON,
        };  
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = init();
            }

            return instance
        }
    }
})();

export default allSubnets;