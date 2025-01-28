//Информацию для отладки оставил, но закомменировал
export const process = (store, order) => {
    const storeCopy = store.map(item => ({ ...item }));
    const stats = [];
    const assignment = [];
    let mismatches = 0;
  
    const updateStats = (size) => {
      const stat = stats.find(s => s.size === size);
      if (stat) {
        stat.quantity += 1;
      } else {
        stats.push({ size, quantity: 1 });
      }
    };
  
    for (const customer of order) {
      const { id, size } = customer;
      let assignedSize = null;
  
      //console.log(`Обрабатываем заказ покупателя ${id} с размерами ${size}`);
  
      if (size.length === 1) {
        const [s] = size;
        const storeItem = storeCopy.find(item => item.size === s && item.quantity > 0);
        if (storeItem) {
          assignedSize = s;
          storeItem.quantity -= 1;
          //console.log(`Назначен размер ${s} для покупателя ${id}`);
        } else {
          //console.log(`Размер ${s} недоступен для покупателя ${id}`);
        }
      } else if (size.length === 2) {
        const [s1, s2] = size;
        const masterSize = customer.masterSize;
  
        if (masterSize === 's1') {
          const storeItem = storeCopy.find(item => item.size === s1 && item.quantity > 0);
          if (storeItem) {
            assignedSize = s1;
            storeItem.quantity -= 1;
            //console.log(`Назначен приоритетный размер ${s1} для покупателя ${id}`);
          } else {
            const storeItem2 = storeCopy.find(item => item.size === s2 && item.quantity > 0);
            if (storeItem2) {
              assignedSize = s2;
              storeItem2.quantity -= 1;
              mismatches += 1;
              //console.log(`Назначен альтернативный размер ${s2} для покупателя ${id}`);
            } else {
              //console.log(`Размеры ${s1} и ${s2} недоступны для покупателя ${id}`);
            }
          }
        } else if (masterSize === 's2') {
          const storeItem = storeCopy.find(item => item.size === s2 && item.quantity > 0);
          if (storeItem) {
            assignedSize = s2;
            storeItem.quantity -= 1;
            //onsole.log(`Назначен приоритетный размер ${s2} для покупателя ${id}`);
          } else {
            const storeItem1 = storeCopy.find(item => item.size === s1 && item.quantity > 0);
            if (storeItem1) {
              assignedSize = s1;
              storeItem1.quantity -= 1;
              mismatches += 1;
              //console.log(`Назначен альтернативный размер ${s1} для покупателя ${id}`);
            } else {
              //console.log(`Размеры ${s1} и ${s2} недоступны для покупателя ${id}`);
            }
          }
        }
      }
  
      if (assignedSize === null) {
        console.log(`Заказ покупателя ${id} не может быть выполнен`);
        return false;
      }
  
      updateStats(assignedSize);
      assignment.push({ id, size: assignedSize });
    }
  
    stats.sort((a, b) => a.size - b.size);
  
    return {
      stats,
      assignment,
      mismatches,
    };
  };