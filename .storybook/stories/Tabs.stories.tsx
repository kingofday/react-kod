import React from "react";
import { action } from "@storybook/addon-actions";
import { Tabs, Tab } from "../../src/components/Tab";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {
    title: "/Tabs",
    component: Tabs
};
export default meta;
type Story = StoryObj<typeof Tabs>;
export const DefaultTab: Story = {
    render: () => <Tabs defaultActiveTab="t1">
        <Tab key="t1" title="تب 1">
            تب اول
        </Tab>
        <Tab key="t2" title="تب 2 با آیکون" icon="#">
            تب دوم با آیکون
        </Tab>
        <Tab key="t4" title="تب 3">
            تب سوم
        </Tab>
        <Tab key="t5" title="تب 4">
            تب چهارم{" "}
        </Tab>
        <Tab key="t6" title="تب 5">
            تب پنجم
        </Tab>
    </Tabs>,
};
export const PillTab: Story = {
    render: () => <Tabs variant="pill" defaultActiveTab="t1">
        <Tab key="t1" title="تب 1">
            تب اول
        </Tab>
        <Tab key="t2" title="تب 2 با آیکون" icon="#">
            تب دوم با آیکون
        </Tab>
        <Tab key="t4" title="تب 3">
            تب سوم
        </Tab>
        <Tab key="t5" title="تب 4">
            تب چهارم
        </Tab>
        <Tab key="t6" title="تب 5">
            تب پنجم
        </Tab>
    </Tabs>,
};
export const BorderedPillTab: Story = {
    render: () => <Tabs
        defaultActiveTab="t1"
        variant="bordered-pill"
        alignTitles="center"
    >
        <Tab key="t1" title="تب 1">
            تب اول
        </Tab>
        <Tab key="t2" title="تب 2">
            تب دوم
        </Tab>
        <Tab key="t3" title="تب 3">
            تب سوم
        </Tab>
    </Tabs>,
};      