using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using JsBoard.Data.Contracts;

namespace JsBoard.Data
{
    public class InMemoryRepository<T> : IRepository<T> where T: class
    {
        private readonly bool _autoId = false;
        private long _identifier = 0;
        private readonly PropertyInfo _keyPropertyInfo = null;
        protected ConcurrentDictionary<string, T> EntitiesDictionary;

        public InMemoryRepository(string dictKeyProp, bool autoId = false)
        {
            if (string.IsNullOrEmpty(dictKeyProp))
                throw new ArgumentNullException("dictKeyProp");

            var entityType = typeof (T);
            _keyPropertyInfo = entityType.GetProperty(dictKeyProp);

            _autoId = autoId;
            EntitiesDictionary = new ConcurrentDictionary<string, T>();
        }

        private string GetKeyValue(T entity)
        {
            var retval = _keyPropertyInfo.GetValue(entity, null);
            return retval.ToString();
        }

        private void SetKeyValue(T entity, string value)
        {
            _keyPropertyInfo.SetValue(entity, Convert.ChangeType(value, _keyPropertyInfo.PropertyType), null);
        }

        public void Add(T entity)
        {
            var key = _autoId ? (_identifier++).ToString() : GetKeyValue(entity);
            SetKeyValue(entity, key);

            EntitiesDictionary[key] = entity;
        }

        public void Remove(T entity)
        {
            T enToDel;
            EntitiesDictionary.TryRemove(GetKeyValue(entity), out enToDel);
        }

        public void RemoveById(object id)
        {
            T enToDel;
            if (EntitiesDictionary.TryGetValue(id.ToString(), out enToDel))
            {
                Remove(EntitiesDictionary[id.ToString()]);
            }
        }

        public void Update(T entity)
        {
            EntitiesDictionary[GetKeyValue(entity)] = entity;
        }

        public IEnumerable<T> GetAll()
        {
            return EntitiesDictionary.Select(x => x.Value);
        }
    }
}