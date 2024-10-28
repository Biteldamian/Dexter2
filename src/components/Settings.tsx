import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface Settings {
  watchFolder: string;
  ollamaEndpoint: string;
  updateInterval: number;
  maxConcurrentTasks: number;
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    watchFolder: '',
    ollamaEndpoint: '',
    updateInterval: 60,
    maxConcurrentTasks: 3
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('dexterSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      localStorage.setItem('dexterSettings', JSON.stringify(settings));
      setSaveMessage('Settings saved successfully!');
      
      // Reload file watcher with new settings
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: settings }));
    } catch (error) {
      setSaveMessage('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Watch Folder Path</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={settings.watchFolder}
            onChange={(e) => setSettings({ ...settings, watchFolder: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ollama API Endpoint</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={settings.ollamaEndpoint}
            onChange={(e) => setSettings({ ...settings, ollamaEndpoint: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Update Interval (seconds)</label>
          <input
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={settings.updateInterval}
            onChange={(e) => setSettings({ ...settings, updateInterval: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Concurrent Tasks</label>
          <input
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={settings.maxConcurrentTasks}
            onChange={(e) => setSettings({ ...settings, maxConcurrentTasks: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;