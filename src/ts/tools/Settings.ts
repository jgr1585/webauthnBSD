const settings = {};

export default settings;

export function fetchAllowRegistration() {
    return fetchSettings<boolean>('allowRegistration');
}

function fetchSettings<Type>(setting: string): Promise<Type> {
  return fetch('/api/settings.php?' + new URLSearchParams({
    setting: setting
  }), {method: 'GET'})
  .then(res => res.json())
}
