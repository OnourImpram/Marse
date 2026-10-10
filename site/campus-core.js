/** Pure logic shared by the static renderer, browser and Node tests. */
export function parseSelection(value,allowed){const ids=new Set(allowed);return [...new Set(String(value||'').split(',').filter(id=>/^[a-z0-9-]+$/.test(id)&&ids.has(id)))].slice(0,4);}
export function eventState(end,today){for(const value of [end,today])if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)throw new Error('Valid ISO dates required');return end<today?'past':end===today?'today':'upcoming';}
