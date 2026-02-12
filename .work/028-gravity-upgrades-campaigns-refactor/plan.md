# Gravity Circles, Upgrades, Campaigns, and Refactor Plan

## Overview
Implement several game improvements: make gravity circles have elastic collision and static color, add break speed as an upgrade option with health upgrades adding 0.5 at a time, allow multiple campaign instances, and refactor/update skills, instructions, and prompts.

## Step 1: Gravity Circles Elastic Collision and Static Color
- Modify gravity circles to use elastic collision affect instead of current behavior
- Ensure gravity circles have a static color (not dynamic)
- Update relevant game object definitions and affects

## Step 2: Add Break Speed Upgrade Option
- Add "break speed" as a new stat upgrade option in campaigns
- Update campaign types and data to include break speed
- Implement break speed logic in game mechanics (likely related to velocity or movement)

## Step 3: Health Upgrade Adjustment
- Change health upgrades to add only 0.5 health per upgrade
- Require multiple upgrades to see noticeable health increase
- Update campaign data and upgrade logic accordingly

## Step 4: Allow Multiple Campaign Instances
- Modify campaign system to allow multiple simultaneous instances of the same campaign
- Update campaign storage and management to support instance tracking
- Ensure each instance maintains separate progress and hero stats

## Step 5: Refactor, Update, and Create Skills, Instructions, and Prompts
- Review and update existing skills in `.github/skills/` for relevance and accuracy
- Create new skills for any new features or processes
- Update instructions and prompts in `.github/` as needed
- Ensure documentation reflects current codebase structure and practices