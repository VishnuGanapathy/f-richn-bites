'use client';

import { useState } from 'react';
import { Store, Bell, Shield, Palette, Save, CheckCircle } from 'lucide-react';

const Section = ({ icon: Icon, title, description, children }: { icon: any; title: string; description: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8">
        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#fcf9f5] border border-[#c69f62]/20 flex items-center justify-center text-[#c69f62] shrink-0">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-[#111111] tracking-tight">{title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>
        </div>
        <div className="space-y-5">{children}</div>
    </div>
);

const Field = ({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) => (
    <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/30 transition-all font-medium text-[#111111]"
        />
    </div>
);

const Toggle = ({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) => {
    const [on, setOn] = useState(defaultChecked ?? false);
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
                <p className="text-sm font-semibold text-[#111111]">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
            <button
                onClick={() => setOn(!on)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${on ? 'bg-[#c69f62]' : 'bg-gray-200'}`}
            >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${on ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="space-y-6 max-w-3xl">

            <Section icon={Store} title="Store Information" description="Basic details about your Rich'n Bites store">
                <div className="grid grid-cols-2 gap-5">
                    <Field label="Store Name" defaultValue="Rich'n Bites" />
                    <Field label="Contact Email" defaultValue="hello@richnbites.com" type="email" />
                </div>
                <Field label="Address" defaultValue="123 Luxury Lane, Culinary District, Mumbai 400001" />
                <div className="grid grid-cols-2 gap-5">
                    <Field label="Phone" defaultValue="+91 98765 43210" />
                    <Field label="WhatsApp" defaultValue="+91 98765 43210" />
                </div>
            </Section>

            <Section icon={Bell} title="Notifications" description="Control which alerts and emails you receive">
                <Toggle label="New Order Alerts" description="Get notified when a new order is placed" defaultChecked />
                <Toggle label="Low Stock Warnings" description="Alert when inventory drops below threshold" defaultChecked />
                <Toggle label="Weekly Revenue Report" description="Receive a weekly summary every Monday" />
                <Toggle label="Customer Review Alerts" description="Notify on new customer reviews" />
            </Section>

            <Section icon={Palette} title="Storefront" description="Customize how your store appears to customers">
                <div className="grid grid-cols-2 gap-5">
                    <Field label="Currency" defaultValue="INR (₹)" />
                    <Field label="Language" defaultValue="English" />
                </div>
                <Toggle label="Show Featured Products" description="Display featured products on homepage" defaultChecked />
                <Toggle label="Show Out-of-Stock Products" description="Customers can view but not buy" defaultChecked />
            </Section>

            <Section icon={Shield} title="Admin Access" description="Manage security and admin account settings">
                <Field label="Admin Display Name" defaultValue="Admin User" />
                <Field label="Admin Email" defaultValue="admin@richnbites.com" type="email" />
                <Toggle label="Two-Factor Authentication" description="Require 2FA for admin login" />
                <Toggle label="Session Timeout" description="Auto-logout after 30 minutes of inactivity" defaultChecked />
            </Section>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${saved
                        ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]'
                        : 'bg-[#111111] text-white hover:bg-[#c69f62] hover:shadow-[0_4px_20px_rgba(198,159,98,0.4)]'
                        }`}
                >
                    {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
            </div>
        </div>
    );
}
